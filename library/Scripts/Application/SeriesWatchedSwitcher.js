'use strict';

class SeriesWatchedSwitcher extends BaseClass
{
	#_episodes;
	#_apiController;

	constructor( episodes, apiController )
	{
		super();

		this.#_episodes      = episodes;
		this.#_apiController = apiController;
	}

	async switchSeriesWatchedAsync()
	{
		this.#_episodes.series.forEach(
			( series ) =>
			{
				this.#_episodes.switchWatchAsync( series, false );
			}
		);

		const responseData = await this.#_apiController.readUserSeriesWatchedFilteredAsync( this.#_episodes.series );
		responseData
			.data
			.seriesWatched
			.forEach(
				( series ) =>
				{
					this.#_episodes.switchWatchAsync( series, true );
				}
			);
	}
}
