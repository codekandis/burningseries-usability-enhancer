'use strict';

class SeriesWatchedFilter extends BaseClass
{
	#_episodes;
	#_apiController;
	#_removeIfFiltered;

	constructor( episodes, apiController, removeIfFiltered )
	{
		super();

		this.#_episodes         = episodes;
		this.#_apiController    = apiController;
		this.#_removeIfFiltered = removeIfFiltered;
	}

	async filter()
	{
		const responseData = await this.#_apiController.readUserSeriesWatchedFiltered( this.#_episodes.series );

		if ( true === this.#_removeIfFiltered )
		{
			responseData
				.data
				.seriesWatched
				.forEach(
					( series ) =>
					{
						this.#_episodes.remove( series );
					}
				);
		}
	}
}
