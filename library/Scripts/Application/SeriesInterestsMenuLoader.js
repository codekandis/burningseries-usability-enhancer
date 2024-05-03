'use strict';

class SeriesInterestsMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async loadSeriesInterestsAsync()
	{
		const responseData = await this.#_apiController.readUserSeriesInterestsAsync();
		this._addSeriesAsync( responseData.data.seriesInterests );
	}
}
