'use strict';

class SeriesDefaultPlayerDeterminator extends BaseClass
{
	#_defaultPlayers;

	constructor( defaultPlayers )
	{
		super();

		this.#_defaultPlayers = defaultPlayers;
	}

	determineSeriesDefaultPlayer( seriesPlayers )
	{
		const existentDefaultPlayer = this
			.#_defaultPlayers
			.find(
				( defaultPlayer ) =>
				{
					return seriesPlayers.includes( defaultPlayer );
				}
			);

		return existentDefaultPlayer ?? seriesPlayers[ 0 ];
	}
}
