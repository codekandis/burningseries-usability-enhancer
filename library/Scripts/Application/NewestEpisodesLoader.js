'use strict';

class NewestEpisodesLoader extends BaseClass
{
	#_bsToController;

	constructor( bsToController )
	{
		super();

		this.#_bsToController = bsToController;
	}

	async loadAsync()
	{
		const uri = String.format`${ 0 }//${ 1 }`( window.location.protocol, window.location.hostname );

		return await this.#_bsToController.readNewestEpisodesAsync( uri );
	}
}
