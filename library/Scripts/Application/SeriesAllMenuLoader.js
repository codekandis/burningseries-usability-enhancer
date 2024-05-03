'use strict';

class SeriesAllMenuLoader extends BaseSeriesMenuLoader
{
	constructor( selector, bsToController )
	{
		super( selector );

		this._bsToController = bsToController;
	}

	async loadSeriesAllAsync()
	{
		const uri       = String.format`${ 0 }//${ 1 }${ 2 }`( window.location.protocol, window.location.hostname, '/andere-serien' );
		const seriesAll = await this._bsToController.readSeriesAllAsync( uri );
		this._addSeriesAsync( seriesAll );
	}
}
