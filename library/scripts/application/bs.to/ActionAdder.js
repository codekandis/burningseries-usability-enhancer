'use strict';

class ActionAdder extends BaseClass
{
	constructor( episodes, apiController, actionPosition, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher )
	{
		super();

		this._currentActionType = ActionTypes.DENIAL;
		this._episodes          = episodes;
		this._apiController     = apiController;
		this._actionPosition    = actionPosition;
		this._denialsFilter     = denialsFilter;
		this._denialsSwitcher   = denialsSwitcher;
		this._interestsSwitcher = interestsSwitcher;
		this._favoritesSwitcher = favoritesSwitcher;
		this._contextMenu       = null;
	}

	_switchAll()
	{
		this._denialsSwitcher.switch();
		this._interestsSwitcher.switch();
		this._favoritesSwitcher.switch();
	}

	_denySeries( series )
	{
		switch ( series.isDenial )
		{
			case false:
			{
				this
					._apiController
					.addUserSeriesDenial( series )
					.then(
						( responseData ) =>
						{
							this._denialsFilter.filter();
							this._switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					._apiController
					.deleteUserSeriesDenial( series )
					.then(
						( responseData ) =>
						{
							this._switchAll();
						}
					);

				return;
			}
		}
	}

	_interestSeries( series )
	{
		switch ( series.isInterest )
		{
			case false:
			{
				this
					._apiController
					.addUserSeriesInterest( series )
					.then(
						( responseData ) =>
						{
							this._switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					._apiController
					.deleteUserSeriesInterest( series )
					.then(
						( responseData ) =>
						{
							this._switchAll();
						}
					);

				return;
			}
		}
	}

	_favorSeries( series )
	{
		switch ( series.isFavorite )
		{
			case false:
			{
				this
					._apiController
					.addUserSeriesFavorite( series )
					.then(
						( responseData ) =>
						{
							this._switchAll();
						}
					);

				return;
			}
			case true:
			{
				this
					._apiController
					.deleteUserSeriesFavorite( series )
					.then(
						( responseData ) =>
						{
							this._switchAll();
						}
					);

				return;
			}
		}
	}

	_invokeAction( button, series )
	{
		switch ( this._currentActionType )
		{
			case ActionTypes.DENIAL:
			{
				this._denySeries( series );

				return;
			}
			case ActionTypes.INTEREST:
			{
				this._interestSeries( series );

				return;
			}
			case ActionTypes.FAVORITE:
			{
				this._favorSeries( series );

				return;
			}
		}
	}

	_hideContextMenu()
	{
		if ( null !== this._contextMenu )
		{
			this._contextMenu.hide();
		}
	}

	_showContextMenu( button, series )
	{
		this._contextMenu = new ActionContextMenu(
			button.parentNode,
			series,
			[
				{
					caption:    true === series.isDenial
						            ? 'Permit'
						            : 'Deny',
					actionType: ActionTypes.DENIAL,
					action:     this._denySeries.bind( this )
				},
				{
					caption:    true === series.isInterest
						            ? 'Deinterest'
						            : 'Interest',
					actionType: ActionTypes.INTEREST,
					action:     this._interestSeries.bind( this )
				},
				{
					caption:    true === series.isFavorite
						            ? 'Defavorite'
						            : 'Favorite',
					actionType: ActionTypes.FAVORITE,
					action:     this._favorSeries.bind( this )
				}
			],
			button.parentNode
		);
		this._contextMenu.show();
	}

	_getButtonEventHandlerMappings( button, series )
	{
		return {
			click:       ( event ) =>
			             {
				             this._invokeAction( button, series );
			             },
			contextmenu: ( event ) =>
			             {
				             event.preventDefault();
				             event.stopPropagation();

				             this._showContextMenu( button, series );
			             }
		};
	}

	_setActionType( button, modifierKeys )
	{
		if ( false === modifierKeys.ctrl && false === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentActionType = ActionTypes.DENIAL;
		}
		if ( false === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentActionType = ActionTypes.INTEREST;
		}
		if ( true === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentActionType = ActionTypes.FAVORITE;
		}

		DomHelper.setAttribute( button, 'data-action-type', this._currentActionType );
	}

	_getHtmlEventHandlerMappings( button )
	{
		const eventHandler = ( event ) =>
		{
			this._setActionType(
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
		DomHelper.addEventHandler( document, 'click', this._document_click );

		this
			._episodes
			.series
			.forEach(
				( series ) =>
				{
					const button = DomHelper.createElementFromString(
						String.format`<button data-control-type="ACTION" data-action-type="${ 0 }"/>`( this._currentActionType )
					);
					DomHelper.addEventHandlers(
						button,
						this._getButtonEventHandlerMappings( button, series )
					);
					DomHelper.addEventHandlersBySelector(
						'html',
						this._getHtmlEventHandlerMappings( button )
					);

					series.container.insertAdjacentElement( this._actionPosition, button );
				}
			);
	}

	_document_click = ( event ) =>
	{
		this._hideContextMenu();
	}
}
