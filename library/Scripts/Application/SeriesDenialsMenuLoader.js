'use strict';

class SeriesDenialsMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async loadSeriesDenialsAsync()
	{
		const responseData = await this.#_apiController.readUserSeriesDenialsAsync();
		this._addSeriesAsync( responseData.data.seriesDenials );
	}
}
