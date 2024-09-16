'use strict';

class SettingsDefaultPlayersArrayizer extends BaseClass
{
	#_settings;

	constructor( settings )
	{
		super();

		this.#_settings = settings;
	}

	arrayize()
	{
		return this
			.#_settings
			.get( 'defaultPlayers' )
			.split( ' ' )
			.filter(
				( defaultPlayer ) =>
				{
					return '' !== defaultPlayer;
				}
			)
			.map(
				( defaultPlayer ) =>
				{
					return defaultPlayer.ucFirst();
				}
			);
	}
}
