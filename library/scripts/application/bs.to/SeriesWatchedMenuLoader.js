'use strict';

class SeriesWatchedMenuLoader extends BaseSeriesMenuLoader
{
	constructor( selector, apiController )
	{
		super( selector );

		this._apiController = apiController;
	}

	async load()
	{
		const responseData = await this._apiController.readUserSeriesWatched();
		this._addSeries( responseData.data.seriesWatched );
	}
}
