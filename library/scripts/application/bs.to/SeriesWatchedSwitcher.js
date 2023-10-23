'use strict';

class SeriesWatchedSwitcher extends BaseClass
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
				this._episodes.switchWatch( series, false );
			}
		);

		const responseData = await this._apiController.readUserSeriesWatchedFiltered( this._episodes.series );
		responseData
			.data
			.seriesWatched
			.forEach(
				( series ) =>
				{
					this._episodes.switchWatch( series, true );
				}
			);
	}
}
