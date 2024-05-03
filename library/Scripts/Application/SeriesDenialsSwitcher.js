'use strict';

class SeriesDenialsSwitcher extends BaseClass
{
	#_episodes;
	#_apiController;

	constructor( episodes, apiController )
	{
		super();

		this.#_episodes      = episodes;
		this.#_apiController = apiController;
	}

	async switchSeriesDenialsAsync()
	{
		this.#_episodes.series.forEach(
			( series ) =>
			{
				this.#_episodes.switchDenialAsync( series, false );
			}
		);

		const responseData = await this.#_apiController.readUserSeriesDenialsFilteredAsync( this.#_episodes.series );
		responseData
			.data
			.seriesDenials
			.forEach(
				( series ) =>
				{
					this.#_episodes.switchDenialAsync( series, true );
				}
			);
	}
}
