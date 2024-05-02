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

	async load()
	{
		const loadHandler = ( resolvedHandler, storedSettings ) =>
		{
			storedSettings.forEach(
				( value, name ) =>
				{
					if ( undefined !== this.#_settingsData[ name ] )
					{
						this.#_settingsData[ name ] = value;
					}
				}
			);

			resolvedHandler( this );
		};

		return await new Promise(
			( resolvedHandler, rejectedHandler ) =>
			{
				browser
					.storage
					.local
					.get( 'settings' )
					.then(
						( storage ) =>
						{
							const storedSettings = storage.settings;
							if ( undefined === storedSettings )
							{
								this
									.save()
									.then(
										( settings ) =>
										{
											loadHandler( resolvedHandler, this.#_settingsData );
										}
									);
							}
							else
							{
								loadHandler( resolvedHandler, storedSettings );
							}
						}
					);
			}
		);
	}

	async save()
	{
		return await new Promise(
			( resolvedHandler, rejectedHandler ) =>
			{
				browser
					.storage
					.local
					.get( 'settings' )
					.then(
						( storage ) =>
						{
							const storedSettings = storage.settings ?? {};
							{
								this.#_settingsData.forEach(
									( value, name ) =>
									{
										storedSettings[ name ] = this.#_settingsData[ name ];
									}
								);
							}

							browser
								.storage
								.local
								.set(
									{ settings: storedSettings }
								)
								.then(
									( settings ) =>
									{
										resolvedHandler( this );
									}
								)
						}
					);
			}
		);
	}
}
