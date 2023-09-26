'use strict';

class DenialsSwitcher extends BaseClass
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
						this._episodes.switchDenial( series, false );
					}
				);

				this._apiController
					.readUserSeriesDenialsFiltered( this._episodes.series )
					.then(
						( responseData ) =>
						{
							responseData
								.data
								.seriesDenials
								.forEach(
									( series ) =>
									{
										this._episodes.switchDenial( series, true );
									}
								);
							resolveHandler( this );
						}
					);
			}
		);
	}
}
