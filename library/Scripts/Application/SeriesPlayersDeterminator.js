'use strict';

class SeriesPlayersDeterminator extends BaseClass
{
	#_bsToController;

	constructor( bsToController )
	{
		super();

		this.#_bsToController = bsToController;
	}

	async determineSeriesPlayersAsync( uri )
	{
		return await this.#_bsToController.readSeriesPlayersAsync( uri );
	}
}
