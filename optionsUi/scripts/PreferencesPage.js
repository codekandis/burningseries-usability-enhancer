class PreferencesPage
{
	constructor( settings, preferencesForm )
	{
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
		document
			.querySelectorAll( 'form fieldset [id]' )
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
			( eventName, eventHandler ) =>
			{
				this._preferencesForm.addEventListener(
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
		document
			.querySelectorAll( 'form fieldset [id]' )
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
