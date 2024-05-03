'use strict';

class SeriesInterestsSwitcher extends BaseClass
{
	#_episodes;
	#_apiController;

	constructor( episodes, apiController )
	{
		super();

		this.#_episodes      = episodes;
		this.#_apiController = apiController;
	}

	async switchSeriesInterestsAsync()
	{
		this.#_episodes.series.forEach(
			( series ) =>
			{
				this.#_episodes.switchInterestAsync( series, false );
			}
		);

		const responseData = await this.#_apiController.readUserSeriesInterestsFilteredAsync( this.#_episodes.series );
		responseData
			.data
			.seriesInterests
			.forEach(
				( series ) =>
				{
					this.#_episodes.switchInterestAsync( series, true );
				}
			);
	}
}
