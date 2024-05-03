'use strict';

class SeriesWatchedMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async loadSeriesWatchedAsync()
	{
		const responseData = await this.#_apiController.readUserSeriesWatchedAsync();
		this._addSeriesAsync( responseData.data.seriesWatched );
	}
}
