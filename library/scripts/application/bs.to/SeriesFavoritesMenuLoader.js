'use strict';

class SeriesFavoritesMenuLoader extends BaseSeriesMenuLoader
{
	constructor( selector, apiController )
	{
		super( selector );

		this._apiController = apiController;
	}

	async load()
	{
		const responseData = await this._apiController.readUserSeriesFavorites();
		this._addSeries( responseData.data.seriesFavorites );
	}
}
