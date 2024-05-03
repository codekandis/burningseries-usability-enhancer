'use strict';

class SeriesFavoritesSwitcher extends BaseClass
{
	#_episodes;
	#_apiController;

	constructor( episodes, apiController )
	{
		super();

		this.#_episodes      = episodes;
		this.#_apiController = apiController;
	}

	async switchSeriesFavoritesAsync()
	{
		this.#_episodes.series.forEach(
			( series ) =>
			{
				this.#_episodes.switchFavoriteAsync( series, false );
			}
		);

		const responseData = await this.#_apiController.readUserSeriesFavoritesFilteredAsync( this.#_episodes.series );
		responseData
			.data
			.seriesFavorites
			.forEach(
				( series ) =>
				{
					this.#_episodes.switchFavoriteAsync( series, true );
				}
			);
	}
}
