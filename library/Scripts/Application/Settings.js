'use strict';

class Settings extends BaseClass
{
	#_settingsData = new SettingsData();

	has( name )
	{
		return undefined !== this.#_settingsData[ name ];
	}

	get( name )
	{
		return this.#_settingsData[ name ];
	}

	set( name, value )
	{
		this.#_settingsData[ name ] = value;
	}

	async loadAsync()
	{
		const storage      = await browser.storage.local.get( 'settings' );
		let storedSettings = storage.settings;

		if ( undefined === storedSettings )
		{
			await this.saveAsync();
			storedSettings = this.#_settingsData;
		}

		storedSettings.forEach(
			( value, name ) =>
			{
				if ( undefined !== this.#_settingsData[ name ] )
				{
					this.#_settingsData[ name ] = value;
				}
			}
		);

		return this;
	}

	async saveAsync()
	{
		const storage        = await browser.storage.local.get( 'settings' );
		const storedSettings = storage.settings ?? {};
		{
			this.#_settingsData.forEach(
				( value, name ) =>
				{
					storedSettings[ name ] = this.#_settingsData[ name ];
				}
			);
		}

		await browser.storage.local.set(
			{
				settings: storedSettings
			}
		);

		return this;
	}
}
