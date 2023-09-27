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
				container:       DomHelper.createElementFromString( '<div data-control-type="EPISODES_NAVIGATOR"></div>', null, 'top frame' ),
				buttons:         DomHelper.createElementFromString( '<ul></ul>' )
			},
			{
				selector:        '.serie .hoster-tabs.bottom',
				insertionMethod: DomHelper.insertAfter,
				container:       DomHelper.createElementFromString( '<div data-control-type="EPISODES_NAVIGATOR"></div>', null, 'bottom frame' ),
				buttons:         DomHelper.createElementFromString( '<ul></ul>' )
			}
		];
		this._buttonNavigators.forEach(
			( navigator ) =>
			{
				DomHelper.appendChild( navigator.container, navigator.buttons );
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
		const seasonsContainer   = DomHelper.querySelector( '#seasons ul', document );
		const seasons            = [
			...DomHelper.querySelectorAll( 'li a', seasonsContainer )
		]
			.map(
				( element ) =>
				{
					return element.href;
				}
			);
		const currentSeasonIndex = seasons.indexOf(
			DomHelper
				.querySelector( 'li.active a', seasonsContainer )
				.href
		);

		return {
			list:         seasons,
			currentIndex: currentSeasonIndex
		}
	}

	get _episodes()
	{
		const episodesContainer   = DomHelper.querySelector( '#episodes ul', document );
		const episodes            = [
			...DomHelper.querySelectorAll( 'li a', episodesContainer )
		]
			.map(
				( element ) =>
				{
					return element.href;
				}
			);
		const currentEpisodeIndex = episodes.indexOf(
			DomHelper
				.querySelector( 'li.active a', episodesContainer )
				.href
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
					const buttonIcon = DomHelper.querySelector( 'i', button );
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

		DomHelper.addEventHandler(
			buttons.watchStateToggler,
			'click',
			( event ) =>
			{
				event.preventDefault();
				this._toggleWatchState( buttons.watchStateToggler, seasons, episodes );
			}
		);

		if ( 0 === seasons.currentIndex && 0 === episodes.currentIndex )
		{
			DomHelper.addEventHandler( buttons.previousEpisode, 'click', nullHandler );
			buttons.previousEpisode.classList.add( 'disabled' );
		}
		else
		{
			DomHelper.addEventHandler(
				buttons.previousEpisode,
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
			DomHelper.addEventHandler( buttons.nextEpisode, 'click', nullHandler );
			buttons.nextEpisode.classList.add( 'disabled' );
		}
		else
		{
			DomHelper.addEventHandler(
				buttons.nextEpisode,
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
		DomHelper.addEventHandler(
			document,
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
						String.format`<li data-action-type="${ 0 }"><a href="#"><i class="fas" /></a></li>`( ActionTypes.WATCH_STATE_TOGGLER )
					),
					previousEpisode:   DomHelper.createElementFromString(
						String.format`<li data-action-type="${ 0 }"><a href="#">Previous</a></li>`( ActionTypes.EPISODE_NAVIGATOR )
					),
					nextEpisode:       DomHelper.createElementFromString(
						String.format`<li data-action-type="${ 0 }"><a href="#">Next</a></li>`( ActionTypes.EPISODE_NAVIGATOR )
					)
				};

				const seasons  = this._seasons;
				const episodes = this._episodes;

				this._setWatchState( buttons.watchStateToggler, seasons, episodes );
				this._addButtonEvents( buttons, seasons, episodes );
				this._addKeyEvents( seasons, episodes );

				DomHelper.appendChildren(
					navigator.buttons, buttons.values()
				);

				navigator.insertionMethod(
					DomHelper.querySelector( navigator.selector, document ),
					navigator.container
				);
			}
		);
	}
}
