'use strict';

class ActionAdder extends BaseClass
{
	constructor( episodes, apiController, actionPosition, denialsFilter )
	{
		super();

		this._currentButtonActionType = ButtonActionTypes.DENIAL;
		this._episodes                = episodes;
		this._apiController           = apiController;
		this._actionPosition = actionPosition;
		this._denialsFilter  = denialsFilter;
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

	_favorSeries( series )
	{
		/**
		 * @todo Implement.
		 */
		throw NotImplementedException.with_METHOD_NAME( 'ActionAdder::_favorSeries()' );
	}

	_interestSeries( series )
	{
		/**
		 * @todo Implement.
		 */
		throw NotImplementedException.with_METHOD_NAME( 'ActionAdder::_interestSeries()' );
	}

	_invokeAction( button, series )
	{
		switch ( this._currentButtonActionType )
		{
			case ButtonActionTypes.DENIAL:
			{
				this._denySeries( series );

				break;
			}
			case ButtonActionTypes.FAVORITE:
			{
				this._favorSeries( series );

				break;
			}
			case ButtonActionTypes.INTEREST:
			{
				this._interestSeries( series );

				break;
			}
		}
	}

	_setButtonActionType( button, modifierKeys )
	{
		if ( false === modifierKeys.ctrl && false === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentButtonActionType = ButtonActionTypes.DENIAL;
		}
		if ( true === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentButtonActionType = ButtonActionTypes.FAVORITE;
		}
		if ( false === modifierKeys.ctrl && true === modifierKeys.shift && false === modifierKeys.alt )
		{
			this._currentButtonActionType = ButtonActionTypes.INTEREST;
		}

		button.setAttribute( 'data-action-type', this._currentButtonActionType );
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
					DomHelper.setAttributes(
						series.container,
						{
							'data-is-favorite': SeriesIsFavorite.FALSE,
							'data-is-interest': SeriesIsInterest.FALSE
						}
					);

					const button = DomHelper.createElementFromString(
						String.format`<button data-action-type="${ 0 }"/>`( this._currentButtonActionType ),
						null,
						'codekandis-button'
					);
					DomHelper.addEventHandlers( button, this._getButtonEventHandlerMappings( button, series ) )
					DomHelper.addEventHandlersBySelector( 'html', this._getHtmlEventHandlerMappings( button ) );

					series.container.insertAdjacentElement( this._actionPosition, button );
				}
			);
	}
}
