'use strict';

class ActionAdder extends BaseClass
{
	constructor( episodes, apiController, actionPosition, denialsFilter, interestsSwitcher, favoritesSwitcher )
	{
		super();

		this._currentButtonActionType = ButtonActionTypes.DENIAL;
		this._episodes                = episodes;
		this._apiController           = apiController;
		this._actionPosition          = actionPosition;
		this._denialsFilter           = denialsFilter;
		this._interestsSwitcher       = interestsSwitcher;
		this._favoritesSwitcher       = favoritesSwitcher;
	}

	_denySeries( series )
	{
		this
			._apiController
			.addUserSeriesDenial( series )
			.then(
				( responseData ) =>
				{
					this._denialsFilter.filter();
				}
			);
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
							this._interestsSwitcher.switch();
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
							this._interestsSwitcher.switch();
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
							this._favoritesSwitcher.switch();
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
							this._favoritesSwitcher.switch();
						}
					);

				return;
			}
		}
	}

	_invokeAction( button, series )
	{
		switch ( this._currentButtonActionType )
		{
			case ButtonActionTypes.DENIAL:
			{
				this._denySeries( series );

				return;
			}
			case ButtonActionTypes.INTEREST:
			{
				this._interestSeries( series );

				return;
			}
			case ButtonActionTypes.FAVORITE:
			{
				this._favorSeries( series );

				return;
			}
		}
	}

	_setButtonActionType( button, modifierKeys )
	{
		if ( false === modifierKeys.ctrl && false === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentButtonActionType = ButtonActionTypes.DENIAL;
		}
		if ( false === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentButtonActionType = ButtonActionTypes.INTEREST;
		}
		if ( true === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentButtonActionType = ButtonActionTypes.FAVORITE;
		}

		DomHelper.setAttribute( button, 'data-action-type', this._currentButtonActionType );
	}

	_getButtonEventHandlerMappings( button, series )
	{
		return {
			click: ( event ) =>
			       {
				       this._invokeAction( button, series );
			       }
		};
	}

	_getHtmlEventHandlerMappings( button )
	{
		const eventHandler = ( event ) =>
		{
			this._setButtonActionType(
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
		this
			._episodes
			.series
			.forEach(
				( series ) =>
				{
					const button = DomHelper.createElementFromString(
						String.format`<button data-action-type="${ 0 }"/>`( this._currentButtonActionType ),
						null,
						'codekandis-button'
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
}
