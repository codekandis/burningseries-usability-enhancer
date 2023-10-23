'use strict';

class SeriesFavoritesSwitcher extends BaseClass
{
	constructor( episodes, apiController )
	{
		super();

		this._episodes      = episodes;
		this._apiController = apiController;
	}

	async switch()
	{
		this._episodes.series.forEach(
			( series ) =>
			{
				this._episodes.switchFavorite( series, false );
			}
		);

		const responseData = await this._apiController.readUserSeriesFavoritesFiltered( this._episodes.series );
		responseData
			.data
			.seriesFavorites
			.forEach(
				( series ) =>
				{
					this._episodes.switchFavorite( series, true );
				}
			);
	}
}
