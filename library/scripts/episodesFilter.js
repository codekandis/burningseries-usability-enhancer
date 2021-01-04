class EpisodesFilter
{
	constructor( episodes, apiController )
	{
		this._episodes      = episodes;
		this._apiController = apiController;
	}

	async filter()
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._apiController
					.readUserSeriesDenials()
					.then(
						( responseData ) =>
						{
							responseData
								.data
								.seriesDenials
								.forEach(
									( series ) =>
									{
										this._episodes.remove( series.name );
									}
								)
							resolveHandler();
						}
					);
			}
		);
	}
}
