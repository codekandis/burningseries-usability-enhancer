'use strict';

class SeriesInterestsMenuLoader extends BaseSeriesMenuLoader
{
	constructor( selector, apiController )
	{
		super( selector );

		this._apiController = apiController;
	}

	async load()
	{
		const responseData = await this._apiController.readUserSeriesInterests();
		this._addSeries( responseData.data.seriesInterests );
	}
}
