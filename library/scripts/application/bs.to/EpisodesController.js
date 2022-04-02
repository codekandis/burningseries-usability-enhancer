'use strict';

class EpisodesController extends BaseClass
{
	constructor( linkExtender )
	{
		super();

		this._bsToController     = new BsToController();
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

	async _getEnclosingEpisodesOfSeason( seasonUri )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._bsToController
					.readEpisodes( seasonUri )
					.then(
						( seasonsEpisodes ) =>
						{
							const enclosingEpisodes = [
								seasonsEpisodes[ 0 ],
								seasonsEpisodes[ seasonsEpisodes.length - 1 ]
							]
								.map(
									( element ) =>
									{
										this._linkExtender.extend( element );

										return element.href;
									}
								)
							resolveHandler(
								{
									first: enclosingEpisodes[ 0 ],
									last:  enclosingEpisodes[ 1 ],
								}
							);
						}
					);
			}
		);
	}

	async _getWatchState( seasonUri, episodeIndex )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._bsToController
					.readWatchStates( seasonUri )
					.then(
						( watchStates ) =>
						{
							resolveHandler( watchStates[ episodeIndex ] );
						}
					)
			}
		);
	}

	async _setWatchState( button, seasons, episodes )
	{
		await this._getWatchState( seasons.list[ seasons.currentIndex ], episodes.currentIndex )
			.then(
				( watchState ) =>
				{
					const buttonIcon = button.querySelector( 'i' );
					buttonIcon.classList.toggle( 'fa-eye', !watchState );
					buttonIcon.classList.toggle( 'fa-eye-slash', watchState );
				}
			);
	}

	async _toggleWatchState( button, seasons, episodes )
	{
		const currentSeason = seasons.list[ seasons.currentIndex ];

		await this._getWatchState( currentSeason, episodes.currentIndex )
			.then(
				( watchState ) =>
				{
					const stateLink = false === watchState
						? 'watch'
						: 'unwatch';

					this._bsToController
						.toggleWatchState(
							String.format`${ 0 }/${ 1 }:${ 2 }`( currentSeason, stateLink, episodes.currentIndex + 1 )
						)
						.then(
							() =>
							{
								this._setWatchState( button, seasons, episodes );
							}
						)
				}
			);
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

	_addButtonEvents( buttons, seasons, episodes )
	{
		const nullHandler = ( event ) =>
		{
			event.preventDefault();
		};

		buttons.watchStateToggler.addEventListener(
			'click',
			( event ) =>
			{
				event.preventDefault();
				this._toggleWatchState( buttons.watchStateToggler, seasons, episodes );
			}
		);

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

	_addKeyEvents( seasons, episodes )
	{
		document.addEventListener(
			'keydown',
			( event ) =>
			{
				if ( this._keyboardNavigators.previous.ctrlKey === event.ctrlKey
					&& this._keyboardNavigators.previous.shiftKey === event.shiftKey
					&& this._keyboardNavigators.previous.altKey === event.altKey
					&& this._keyboardNavigators.previous.key === event.key )
				{
					if ( 0 !== seasons.currentIndex || 0 !== episodes.currentIndex )
					{
						this._navigateBackward( seasons, episodes );
					}
				}

				if ( this._keyboardNavigators.next.ctrlKey === event.ctrlKey
					&& this._keyboardNavigators.next.shiftKey === event.shiftKey
					&& this._keyboardNavigators.next.altKey === event.altKey
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

	addActions()
	{
		this._buttonNavigators.forEach(
			( navigator ) =>
			{
				const buttons = {
					watchStateToggler: DomHelper.createElementFromString(
						String.format`<li data-action-type="${ 0 }"><a href="#"><i class="fas" /></a></li>`( ButtonActionTypes.WATCH_STATE_TOGGLER )
					),
					previousEpisode:   DomHelper.createElementFromString(
						String.format`<li data-action-type="${ 0 }"><a href="#">Previous</a></li>`( ButtonActionTypes.EPISODE_NAVIGATOR )
					),
					nextEpisode:       DomHelper.createElementFromString(
						String.format`<li data-action-type="${ 0 }"><a href="#">Next</a></li>`( ButtonActionTypes.EPISODE_NAVIGATOR )
					)
				};

				const seasons  = this._seasons;
				const episodes = this._episodes;

				this._setWatchState( buttons.watchStateToggler, seasons, episodes );
				this._addButtonEvents( buttons, seasons, episodes );
				this._addKeyEvents( seasons, episodes );

				DomHelper.appendChildren( navigator.buttons, buttons.values() );

				navigator.insertionMethod(
					document.querySelector( navigator.selector ),
					navigator.container
				);
			}
		);
	}
}
