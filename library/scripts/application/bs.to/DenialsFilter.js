'use strict';

class DenialsFilter extends BaseClass
{
	constructor( episodes, apiController, removeIfFiltered )
	{
		super();

		this._episodes         = episodes;
		this._apiController    = apiController;
		this._removeIfFiltered = removeIfFiltered;
	}

	async filter()
	{
		const responseData = await this._apiController.readUserSeriesDenialsFiltered( this._episodes.series );

		if ( true === this._removeIfFiltered )
		{
			responseData
				.data
				.seriesDenials
				.forEach(
					( series ) =>
					{
						this._episodes.remove( series );
					}
				);
		}
	}
}
