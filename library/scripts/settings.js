console.log( 'codekandis/burningseries-latest-episodes-cleaner: library/scripts/settings' );

class Settings
{
	constructor()
	{
		this._settings = {
			apiBaseUri: 'https://api.burningseries-usability-enhancer.codekandis.net',
			apiUserId:  '',
			apiKey:     ''
		};
	}

	has( name )
	{
		return undefined !== this._settings[ name ];
	}

	get( name )
	{
		return this._settings[ name ];
	}

	set( name, value )
	{
		this._settings[ name ] = value;
	}

	async load()
	{
		const loadHandler = ( resolvedHandler, storedSettings ) =>
		{
			storedSettings.forEach(
				( name, value ) =>
				{
					if ( undefined !== this._settings[ name ] )
					{
						this._settings[ name ] = value;
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
											loadHandler( resolvedHandler, this._settings );
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
								this._settings.forEach(
									( name, value ) =>
									{
										storedSettings[ name ] = this._settings[ name ];
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
