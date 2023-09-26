'use strict';

class InterestsLoader extends BaseClass
{
	constructor( selector, apiController )
	{
		super();

		this._selector      = selector;
		this._apiController = apiController;
	}

	async load()
	{
		const responseData = await this._apiController.readUserSeriesInterests();

		const container     = DomHelper.querySelector( this._selector );
		container.innerHTML = responseData
			.data
			.seriesInterests
			.sort(
				( series_1, series_2 ) =>
				{
					if ( series_1.name < series_2.name )
					{
						return -1;
					}
					if ( series_1.name > series_2.name )
					{
						return 1;
					}
					return 0;
				}
			)
			.map(
				( series ) =>
				{
					return String.format`<li><a href="${ 0 }">${ 1 }</a></li>`( series.uri, series.name );
				}
			)
			.join( '' );
	}
}
