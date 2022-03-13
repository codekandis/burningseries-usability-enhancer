'use strict';

class EpisodesNavigator
{
	constructor( linkExtender )
	{
		this._buttonNavigators   = null;
		this._keyboardNavigators = null;
		this._linkExtender       = linkExtender;

		this._initialize();
	}

	_initialize()
	{
		this._buttonNavigators = [
			{
				selector:        '.serie .episode',
				insertionMethod: DomHelper.insertAfter,
				container:       DomHelper.createElementFromString( '<div></div>', null, 'codekandis-episodesNavigator top frame' ),
				buttons:         DomHelper.createElementFromString( '<ul></ul>' )
			},
			{
				selector:        '.serie .hoster-tabs.bottom',
				insertionMethod: DomHelper.insertAfter,
				container:       DomHelper.createElementFromString( '<div></div>', null, 'codekandis-episodesNavigator bottom frame' ),
				buttons:         DomHelper.createElementFromString( '<ul></ul>' )
			}
		];
		this._buttonNavigators.forEach(
			( navigator ) =>
			{
				navigator.container.appendChild( navigator.buttons );
			}
		);

		this._keyboardNavigators = {
			previous: {
				ctrlKey:  true,
				shiftKey: true,
				altKey:   false,
				key:      'ArrowLeft',
			},
			next:     {
				ctrlKey:  true,
				shiftKey: true,
				altKey:   false,
				key:      'ArrowRight',
			}
		};
	}

	async _getEnclosingEpisodesOfSeason( uri )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				( new BsToController() )
					.readEpisodes( uri )
					.then(
						( responseData ) =>
						{
							const episodes = [ ...responseData.querySelectorAll( 'table.episodes tbody tr:first-child td:nth-child(1) a, table.episodes tbody tr:last-child td:nth-child(1) a' ) ]
								.map(
									( element ) =>
									{
										this._linkExtender.extend( element );
										return element.href;
									}
								)
							resolveHandler(
								{
									first: episodes[ 0 ],
									last:  episodes[ 1 ],
								}
							);
						}
					);
			}
		);
	}

	get _seasons()
	{
		const seasonsContainer   = document.querySelector( '#seasons ul' );
		const seasons            = [ ...seasonsContainer.querySelectorAll( 'li a' ) ]
			.map(
				( element ) =>
				{
					return element.href;
				}
			);
		const currentSeasonIndex = seasons.indexOf(
			seasonsContainer.querySelector( 'li.active a' ).href
		);

		return {
			list:         seasons,
			currentIndex: currentSeasonIndex
		}
	}

	get _episodes()
	{
		const episodesContainer   = document.querySelector( '#episodes ul' );
		const episodes            = [ ...episodesContainer.querySelectorAll( 'li a' ) ]
			.map(
				( element ) =>
				{
					return element.href;
				}
			);
		const currentEpisodeIndex = episodes.indexOf(
			episodesContainer.querySelector( 'li.active a' ).href
		);

		return {
			list:         episodes,
			currentIndex: currentEpisodeIndex
		}
	}

	_navigateBackward( seasons, episodes )
	{
		if ( 0 !== episodes.currentIndex )
		{
			window.location.href = episodes.list[ episodes.currentIndex - 1 ];

			return;
		}

		this._getEnclosingEpisodesOfSeason( seasons.list[ seasons.currentIndex - 1 ] )
			.then(
				( enclosingEpisodes ) =>
				{
					window.location.href = enclosingEpisodes.last;
				}
			);
	}

	_navigateForward( seasons, episodes )
	{
		if ( episodes.list.length - 1 !== episodes.currentIndex )
		{
			window.location.href = episodes.list[ episodes.currentIndex + 1 ];

			return;
		}

		this._getEnclosingEpisodesOfSeason( seasons.list[ seasons.currentIndex + 1 ] )
			.then(
				( enclosingEpisodes ) =>
				{
					window.location.href = enclosingEpisodes.first;
				}
			);
	}

	_addButtonEvents( buttons )
	{
		const nullHandler = ( event ) =>
		{
			event.preventDefault();
		};

		const seasons  = this._seasons;
		const episodes = this._episodes;

		if ( 0 === seasons.currentIndex && 0 === episodes.currentIndex )
		{
			buttons.previousEpisode.addEventListener( 'click', nullHandler );
			buttons.previousEpisode.classList.add( 'disabled' );
		}
		else
		{
			buttons.previousEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
					this._navigateBackward( seasons, episodes );
				}
			);
		}

		if ( seasons.list.length - 1 === seasons.currentIndex && episodes.list.length - 1 === episodes.currentIndex )
		{
			buttons.nextEpisode.addEventListener( 'click', nullHandler );
			buttons.nextEpisode.classList.add( 'disabled' );
		}
		else
		{
			buttons.nextEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
					this._navigateForward( seasons, episodes );
				}
			);
		}
	}

	_addKeyEvents()
	{
		const seasons  = this._seasons;
		const episodes = this._episodes;

		document.addEventListener(
			'keydown',
			( event ) =>
			{
				if ( this._keyboardNavigators.previous.ctrlKey === event.getModifierState( 'Control' )
					&& this._keyboardNavigators.previous.shiftKey === event.getModifierState( 'Shift' )
					&& this._keyboardNavigators.previous.altKey === event.getModifierState( 'Alt' )
					&& this._keyboardNavigators.previous.key === event.key )
				{
					if ( 0 !== seasons.currentIndex || 0 !== episodes.currentIndex )
					{
						this._navigateBackward( seasons, episodes );
					}
				}

				if ( this._keyboardNavigators.next.ctrlKey === event.getModifierState( 'Control' )
					&& this._keyboardNavigators.next.shiftKey === event.getModifierState( 'Shift' )
					&& this._keyboardNavigators.next.altKey === event.getModifierState( 'Alt' )
					&& this._keyboardNavigators.next.key === event.key )
				{
					if ( seasons.list.length - 1 !== seasons.currentIndex || episodes.list.length - 1 !== episodes.currentIndex )
					{
						this._navigateForward( seasons, episodes );
					}
				}
			}
		);
	}

	addNavigation()
	{
		this._buttonNavigators.forEach(
			( navigator ) =>
			{
				const buttons = {
					previousEpisode: DomHelper.createElementFromString( '<li><a href="#">Previous</a></li>' ),
					nextEpisode:     DomHelper.createElementFromString( '<li><a href="#">Next</a></li>' )
				};

				this._addButtonEvents( buttons );
				this._addKeyEvents();

				DomHelper.appendChildren( navigator.buttons, buttons.values() );

				navigator.insertionMethod(
					document.querySelector( navigator.selector ),
					navigator.container
				);
			}
		);
	}
}
