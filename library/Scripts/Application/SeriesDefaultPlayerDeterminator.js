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
		const existendDefaultPlayer = this
			.#_defaultPlayers
			.find(
				( defaultPlayer ) =>
				{
					return seriesPlayers.includes( defaultPlayer );
				}
			);

		return existendDefaultPlayer ?? seriesPlayers[ 0 ];
	}
}
