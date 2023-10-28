'use strict';

class SeriesFavoritesMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async load()
	{
		const responseData = await this.#_apiController.readUserSeriesFavorites();
		this._addSeries( responseData.data.seriesFavorites );
	}
}