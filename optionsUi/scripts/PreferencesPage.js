'use strict';

class PreferencesPage extends BaseClass
{
	constructor( settings, preferencesForm )
	{
		super();

		this._preferencesFormEventHandlerPresets = {
			submit: this._saveSettings,
			reset:  this._loadSettings
		};

		this._settings        = settings;
		this._preferencesForm = preferencesForm;

		this._attachSettings();
		this._addEventHandlersToPreferencesForm();
	}

	_attachSettings()
	{
		DomHelper
			.querySelectorAll( 'form fieldset [id]', document )
			.forEach(
				( settingElement ) =>
				{
					const settingName = settingElement.getAttribute( 'id' );
					if ( true === this._settings.has( settingName ) )
					{
						settingElement.value = this._settings.get( settingName );
					}
				}
			);
	}

	_addEventHandlersToPreferencesForm()
	{
		this._preferencesFormEventHandlerPresets.forEach(
			( eventHandler, eventName ) =>
			{
				DomHelper.addEventHandler(
					this._preferencesForm,
					eventName,
					( event ) =>
					{
						event.preventDefault();
						eventHandler.bind( this )();
					}
				);
			}
		);
	}

	_loadSettings()
	{
		this
			._settings
			.load()
			.then(
				( settings ) =>
				{
					this._attachSettings();
				}
			);
	}

	_saveSettings()
	{
		DomHelper
			.querySelectorAll( 'form fieldset [id]', document )
			.forEach(
				( settingElement ) =>
				{
					const settingName = settingElement.getAttribute( 'id' );
					if ( true === this._settings.has( settingName ) )
					{
						this._settings.set( settingName, settingElement.value );
					}
				}
			);
		this
			._settings
			.save();
	}
}
