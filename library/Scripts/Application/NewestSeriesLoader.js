'use strict';

class NewestSeriesLoader extends BaseClass
{
	#_bsToController;

	constructor( bsToController )
	{
		super();

		this.#_bsToController = bsToController;
	}

	async #replaceNewestSeriesAsync( newestSeries )
	{
		const currentNewestSeries = DomHelper.querySelector( '#newest_series' );
		DomHelper.replaceWith( currentNewestSeries, newestSeries );
	}

	async loadAsync()
	{
		const uri = String.format`${ 0 }//${ 1 }`( window.location.protocol, window.location.hostname );

		return await this.#_bsToController.readNewestSeriesAsync( uri );
	}
}
