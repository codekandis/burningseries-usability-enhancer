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

	#switchAll()
	{
		this.#_denialsSwitcher.switch();
		this.#_interestsSwitcher.switch();
		this.#_favoritesSwitcher.switch();
		this.#_watchedSwitcher.switch();
	}

	#denySeries( series )
	{
		switch ( series.isDenial )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesDenial( series )
					.then(
						( responseData ) =>
						{
							if ( null !== this.#_denialsFilter )
							{
								this.#_denialsFilter.filter();
							}
							this.#switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesDenial( series )
					.then(
						( responseData ) =>
						{
							this.#switchAll();
						}
					);

				return;
			}
		}
	}

	#interestSeries( series )
	{
		switch ( series.isInterest )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesInterest( series )
					.then(
						( responseData ) =>
						{
							if ( null !== this.#_interestsFilter )
							{
								this.#_interestsFilter.filter();
							}
							this.#switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesInterest( series )
					.then(
						( responseData ) =>
						{
							this.#switchAll();
						}
					);

				return;
			}
		}
	}

	#favorSeries( series )
	{
		switch ( series.isFavorite )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesFavorite( series )
					.then(
						( responseData ) =>
						{
							if ( null !== this.#_favoritesFilter )
							{
								this.#_favoritesFilter.filter();
							}
							this.#switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesFavorite( series )
					.then(
						( responseData ) =>
						{
							this.#switchAll();
						}
					);

				return;
			}
		}
	}

	#watchSeries( series )
	{
		switch ( series.isWatch )
		{
			case false:
			{
				this
					.#_apiController
					.addUserSeriesWatch( series )
					.then(
						( responseData ) =>
						{
							if ( null !== this.#_watchedFilter )
							{
								this.#_watchedFilter.filter();
							}
							this.#switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					.#_apiController
					.deleteUserSeriesWatch( series )
					.then(
						( responseData ) =>
						{
							this.#switchAll();
						}
					);

				return;
			}
		}
	}

	#invokeAction( button, series )
	{
		switch ( this.#_currentActionType )
		{
			case ActionTypes.DENIAL:
			{
				this.#denySeries( series );

				return;
			}
			case ActionTypes.INTEREST:
			{
				this.#interestSeries( series );

				return;
			}
			case ActionTypes.FAVORITE:
			{
				this.#favorSeries( series );

				return;
			}
			case ActionTypes.WATCH:
			{
				this.#watchSeries( series );

				return;
			}
		}
	}

	#hideContextMenu()
	{
		if ( null !== this.#_contextMenu )
		{
			this.#_contextMenu.hide();
		}
	}

	#showContextMenu( button, series )
	{
		this.#_contextMenu = new ActionContextMenu(
			button.parentNode,
			series,
			[
				{
					caption:    true === series.isDenial
						            ? 'Permit'
						            : 'Deny',
					actionType: ActionTypes.DENIAL,
					action:     this.#denySeries.bind( this )
				},
				{
					caption:    true === series.isInterest
						            ? 'Deinterest'
						            : 'Interest',
					actionType: ActionTypes.INTEREST,
					action:     this.#interestSeries.bind( this )
				},
				{
					caption:    true === series.isFavorite
						            ? 'Defavorite'
						            : 'Favorite',
					actionType: ActionTypes.FAVORITE,
					action:     this.#favorSeries.bind( this )
				},
				{
					caption:    true === series.isWatch
						            ? 'Unwatch'
						            : 'Watch',
					actionType: ActionTypes.WATCH,
					action:     this.#watchSeries.bind( this )
				}
			],
			button.parentNode
		);
		this.#_contextMenu.show();
	}

	#getButtonEventHandlerMappings( button, series )
	{
		return {
			click:       ( event ) =>
			             {
				             event.preventDefault();
				             event.stopPropagation();

				             this.#invokeAction( button, series );
			             },
			contextmenu: ( event ) =>
			             {
				             event.preventDefault();
				             event.stopPropagation();

				             this.#showContextMenu( button, series );
			             }
		};
	}

	#setActionType( button, modifierKeys )
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
		const eventHandler = ( event ) =>
		{
			this.#setActionType(
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

	addActions()
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
					DomHelper.addEventHandlersBySelector(
						'html',
						this.#getHtmlEventHandlerMappings( button )
					);

					series.container.insertAdjacentElement( this.#_actionPosition, button );
				}
			);
	}

	#document_click = ( event ) =>
	{
		this.#hideContextMenu();
	}
}
