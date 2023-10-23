'use strict';

class SeriesInterestsSwitcher extends BaseClass
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
				this._episodes.switchInterest( series, false );
			}
		);

		const responseData = await this._apiController.readUserSeriesInterestsFiltered( this._episodes.series );
		responseData
			.data
			.seriesInterests
			.forEach(
				( series ) =>
				{
					this._episodes.switchInterest( series, true );
				}
			);
	}
}
