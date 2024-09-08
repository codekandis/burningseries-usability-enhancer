'use strict';

class ActionAdder extends BaseClass
{
	#_currentActionType = ActionTypes.DENIAL;
	#_contextMenu       = null;
	#_episodes;
	#_apiController;
	#_actionPosition;
	#_denialsFilter;
	#_denialsSwitcher;
	#_interestsFilter;
	#_interestsSwitcher;
	#_favoritesFilter;
	#_favoritesSwitcher;
	#_watchedFilter;
	#_watchedSwitcher;

	constructor( episodes, apiController, actionPosition, denialsFilter, denialsSwitcher, interestsFilter, interestsSwitcher, favoritesFilter, favoritesSwitcher, watchedFilter, watchedSwitcher )
	{
		super();

		this.#_episodes          = episodes;
		this.#_apiController     = apiController;
		this.#_actionPosition    = actionPosition;
		this.#_denialsFilter     = denialsFilter;
		this.#_denialsSwitcher   = denialsSwitcher;
		this.#_interestsFilter   = interestsFilter;
		this.#_interestsSwitcher = interestsSwitcher;
		this.#_favoritesFilter   = favoritesFilter;
		this.#_favoritesSwitcher = favoritesSwitcher;
		this.#_watchedFilter     = watchedFilter;
		this.#_watchedSwitcher   = watchedSwitcher;
	}

	async #switchAllAsync()
	{
		this.#_denialsSwitcher.switchSeriesDenialsAsync();
		this.#_interestsSwitcher.switchSeriesInterestsAsync();
		this.#_favoritesSwitcher.switchSeriesFavoritesAsync();
		this.#_watchedSwitcher.switchSeriesWatchedAsync();
	}

	async #openInTab( series )
	{
		window.open(
			DomHelper
				.querySelector( 'a', series.container )
				.href,
			'_blank'
		);
	}

	async #denySeriesAsync( series )
	{
		switch ( series.isDenial )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesDenialAsync( series )
					.then(
						async ( responseData ) =>
						{
							if ( null !== this.#_denialsFilter )
							{
								this.#_denialsFilter.filterSeriesDenialsAsync();
							}
							this.#switchAllAsync();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesDenialAsync( series )
					.then(
						async ( responseData ) =>
						{
							this.#switchAllAsync();
						}
					);

				return;
			}
		}
	}

	async #interestSeriesAsync( series )
	{
		switch ( series.isInterest )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesInterestAsync( series )
					.then(
						async ( responseData ) =>
						{
							if ( null !== this.#_interestsFilter )
							{
								this.#_interestsFilter.filterSeriesInterestsAsync();
							}
							this.#switchAllAsync();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesInterestAsync( series )
					.then(
						async ( responseData ) =>
						{
							this.#switchAllAsync();
						}
					);

				return;
			}
		}
	}

	async #favorSeriesAsync( series )
	{
		switch ( series.isFavorite )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesFavoriteAsync( series )
					.then(
						async ( responseData ) =>
						{
							if ( null !== this.#_favoritesFilter )
							{
								this.#_favoritesFilter.filterSeriesFavoritesAsync();
							}
							this.#switchAllAsync();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesFavoriteAsync( series )
					.then(
						async ( responseData ) =>
						{
							this.#switchAllAsync();
						}
					);

				return;
			}
		}
	}

	async #watchSeriesAsync( series )
	{
		switch ( series.isWatch )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesWatchAsync( series )
					.then(
						async ( responseData ) =>
						{
							if ( null !== this.#_watchedFilter )
							{
								this.#_watchedFilter.filterSeriesWatchedAsync();
							}
							this.#switchAllAsync();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesWatchAsync( series )
					.then(
						async ( responseData ) =>
						{
							this.#switchAllAsync();
						}
					);

				return;
			}
		}
	}

	async #invokeActionAsync( button, series )
	{
		switch ( this.#_currentActionType )
		{
			case ActionTypes.DENIAL:
			{
				this.#denySeriesAsync( series );

				return;
			}
			case ActionTypes.INTEREST:
			{
				this.#interestSeriesAsync( series );

				return;
			}
			case ActionTypes.FAVORITE:
			{
				this.#favorSeriesAsync( series );

				return;
			}
			case ActionTypes.WATCH:
			{
				this.#watchSeriesAsync( series );

				return;
			}
		}
	}

	async #hideContextMenuAsync()
	{
		if ( null !== this.#_contextMenu )
		{
			this.#_contextMenu.hideAsync();
		}
	}

	async #showContextMenuAsync( button, series )
	{
		this.#_contextMenu = new ActionContextMenu(
			button.parentNode,
			series,
			[
				{
					caption:    'Open In Tab',
					actionType: ActionTypes.TAB_OPENER,
					action:     this.#openInTab.bind( this )
				},
				{
					caption:    true === series.isDenial
						            ? 'Permit'
						            : 'Deny',
					actionType: ActionTypes.DENIAL,
					action:     this.#denySeriesAsync.bind( this )
				},
				{
					caption:    true === series.isInterest
						            ? 'Deinterest'
						            : 'Interest',
					actionType: ActionTypes.INTEREST,
					action:     this.#interestSeriesAsync.bind( this )
				},
				{
					caption:    true === series.isFavorite
						            ? 'Defavorite'
						            : 'Favorite',
					actionType: ActionTypes.FAVORITE,
					action:     this.#favorSeriesAsync.bind( this )
				},
				{
					caption:    true === series.isWatch
						            ? 'Unwatch'
						            : 'Watch',
					actionType: ActionTypes.WATCH,
					action:     this.#watchSeriesAsync.bind( this )
				}
			],
			button.parentNode
		);
		this.#_contextMenu.showAsync();
	}

	#getButtonEventHandlerMappings( button, series )
	{
		return {
			click:       async ( event ) =>
			             {
				             event.preventDefault();
				             event.stopPropagation();

				             this.#invokeActionAsync( button, series );
			             },
			contextmenu: async ( event ) =>
			             {
				             event.preventDefault();
				             event.stopPropagation();

				             this.#showContextMenuAsync( button, series );
			             }
		};
	}

	async #setActionTypeAsync( button, modifierKeys )
	{
		if ( false === modifierKeys.ctrl && false === modifierKeys.shift && false === modifierKeys.alt )
		{
			this.#_currentActionType = ActionTypes.DENIAL;
		}
		if ( false === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this.#_currentActionType = ActionTypes.INTEREST;
		}
		if ( true === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this.#_currentActionType = ActionTypes.FAVORITE;
		}
		if ( true === modifierKeys.ctrl && true === modifierKeys.shift && true === modifierKeys.alt )
		{
			this.#_currentActionType = ActionTypes.WATCH;
		}

		DomHelper.setAttribute( button, 'data-action-type', this.#_currentActionType );
	}

	#getHtmlEventHandlerMappings( button )
	{
		const eventHandler = async ( event ) =>
		{
			this.#setActionTypeAsync(
				button,
				{
					ctrl:  event.ctrlKey,
					shift: event.shiftKey,
					alt:   event.altKey
				}
			);
		};

		return {
			keydown: eventHandler,
			keyup:   eventHandler
		};
	}

	async addActionsAsync()
	{
		DomHelper.addEventHandler( document, 'click', this.#document_click );

		this
			.#_episodes
			.series
			.forEach(
				( series ) =>
				{
					const button = DomHelper.createElementFromString(
						String.format`<button data-control-type="ACTION" data-action-type="${ 0 }"/>`( this.#_currentActionType )
					);
					DomHelper.addEventHandlers(
						button,
						this.#getButtonEventHandlerMappings( button, series )
					);
					DomHelper.addEventHandlers(
						document,
						this.#getHtmlEventHandlerMappings( button )
					);

					series.container.insertAdjacentElement( this.#_actionPosition, button );
				}
			);
	}

	#document_click = async ( event ) =>
	{
		this.#hideContextMenuAsync();
	}
}
