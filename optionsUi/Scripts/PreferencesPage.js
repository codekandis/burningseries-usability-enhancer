'use strict';

class PreferencesPage extends BaseClass
{
	#_settings;
	#_preferencesForm;
	#_preferencesFormEventHandlerPresets = {
		submit: this.#saveSettings,
		reset:  this.#loadSettings
	};

	constructor( settings, preferencesForm )
	{
		super();

		this.#_settings        = settings;
		this.#_preferencesForm = preferencesForm;

		this.#initialize();
	}

	#initialize()
	{
		this.#attachSettings();
		this.#addEventHandlersToPreferencesForm();
	}

	#attachSettings()
	{
		DomHelper
			.querySelectorAll( 'form fieldset [id]', document )
			.forEach(
				( settingElement ) =>
				{
					const settingName = settingElement.getAttribute( 'id' );
					if ( true === this.#_settings.has( settingName ) )
					{
						settingElement.value = this.#_settings.get( settingName );
					}
				}
			);
	}

	#addEventHandlersToPreferencesForm()
	{
		this.#_preferencesFormEventHandlerPresets.forEach(
			( eventHandler, eventName ) =>
			{
				DomHelper.addEventHandler(
					this.#_preferencesForm,
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

	#loadSettings()
	{
		this
			.#_settings
			.load()
			.then(
				( settings ) =>
				{
					this.#attachSettings();
				}
			);
	}

	#saveSettings()
	{
		DomHelper
			.querySelectorAll( 'form fieldset [id]', document )
			.forEach(
				( settingElement ) =>
				{
					const settingName = settingElement.getAttribute( 'id' );
					if ( true === this.#_settings.has( settingName ) )
					{
						this.#_settings.set( settingName, settingElement.value );
					}
				}
			);
		this
			.#_settings
			.save();
	}
}
