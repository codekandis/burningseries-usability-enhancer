'use strict';

class SeriesWatchedMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async load()
	{
		const responseData = await this.#_apiController.readUserSeriesWatched();
		this._addSeries( responseData.data.seriesWatched );
	}
}
