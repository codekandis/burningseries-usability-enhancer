'use strict';

class SeriesDenialsMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async load()
	{
		const responseData = await this.#_apiController.readUserSeriesDenials();
		this._addSeries( responseData.data.seriesDenials );
	}
}
