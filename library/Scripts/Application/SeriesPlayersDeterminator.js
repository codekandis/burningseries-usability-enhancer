'use strict';

class SeriesPlayersDeterminator extends BaseClass
{
	#_bsToController;

	constructor( bsToController )
	{
		super();

		this.#_bsToController = bsToController;
	}

	async determineSeriesPlayersAsync( link )
	{
		return await this.#_bsToController.readSeriesPlayersAsync( link.href );
	}
}
