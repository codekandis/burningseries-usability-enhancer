'use strict';

class PreferencesPage extends BaseClass
{
	#_settings;
	#_preferencesForm;
	#_preferencesFormEventHandlerPresets = {
		submit: this.#saveSettingsAsync.bind( this ),
		reset:  this.#loadSettingsAsync.bind( this )
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
		this.#attachSettingsAsync();
		this.#addEventHandlersToPreferencesFormAsync();
	}

	async #attachSettingsAsync()
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

	async #addEventHandlersToPreferencesFormAsync()
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
						eventHandler();
					}
				);
			}
		);
	}

	async #loadSettingsAsync()
	{
		this
			.#_settings
			.loadAsync()
			.then(
				async ( settings ) =>
				{
					this.#attachSettingsAsync();
				}
			);
	}

	async #saveSettingsAsync()
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
			.saveAsync();
	}
}
