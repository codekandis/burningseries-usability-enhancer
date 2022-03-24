'use strict';

class FavoritesSwitcher extends BaseClass
{
	constructor( episodes, apiController )
	{
		super();

		this._episodes      = episodes;
		this._apiController = apiController;
	}

	async switch()
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._episodes.series.forEach(
					( series ) =>
					{
						this._episodes.switchFavorite( series, false );
					}
				);

				this._apiController
					.readUserSeriesFavoritesFiltered( this._episodes.series )
					.then(
						( responseData ) =>
						{
							responseData
								.data
								.seriesFavorites
								.forEach(
									( series ) =>
									{
										this._episodes.switchFavorite( series, true );
									}
								);
							resolveHandler( this );
						}
					);
			}
		);
	}
}
