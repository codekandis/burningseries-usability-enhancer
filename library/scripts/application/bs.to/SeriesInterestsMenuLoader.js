'use strict';

class SeriesInterestsMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async load()
	{
		const responseData = await this.#_apiController.readUserSeriesInterests();
		this._addSeries( responseData.data.seriesInterests );
	}
}
