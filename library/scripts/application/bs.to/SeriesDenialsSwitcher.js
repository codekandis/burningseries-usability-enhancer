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

	async switch()
	{
		this.#_episodes.series.forEach(
			( series ) =>
			{
				this.#_episodes.switchDenial( series, false );
			}
		);

		const responseData = await this.#_apiController.readUserSeriesDenialsFiltered( this.#_episodes.series );
		responseData
			.data
			.seriesDenials
			.forEach(
				( series ) =>
				{
					this.#_episodes.switchDenial( series, true );
				}
			);
	}
}
