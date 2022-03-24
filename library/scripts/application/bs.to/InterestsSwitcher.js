'use strict';

class InterestsSwitcher extends BaseClass
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
						this._episodes.switchInterest( series, false );
					}
				);

				this._apiController
					.readUserSeriesInterestsFiltered( this._episodes.series )
					.then(
						( responseData ) =>
						{
							responseData
								.data
								.seriesInterests
								.forEach(
									( series ) =>
									{
										this._episodes.switchInterest( series, true );
									}
								);
							resolveHandler( this );
						}
					);
			}
		);
	}
}
