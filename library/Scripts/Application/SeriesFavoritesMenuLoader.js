'use strict';

class SeriesFavoritesMenuLoader extends BaseSeriesMenuLoader
{
	#_apiController;

	constructor( selector, apiController )
	{
		super( selector );

		this.#_apiController = apiController;
	}

	async loadSeriesFavoritesAsync()
	{
		const responseData = await this.#_apiController.readUserSeriesFavoritesAsync();
		this._addSeriesAsync( responseData.data.seriesFavorites );
	}
}
