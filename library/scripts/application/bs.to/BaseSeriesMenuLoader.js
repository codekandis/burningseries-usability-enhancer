'use strict';

class BaseSeriesMenuLoader extends BaseClass
{
	constructor( selector )
	{
		super();

		this._selector = selector;
	}

	_addSeries( series )
	{
		const container     = DomHelper.querySelector( this._selector );
		container.innerHTML = series
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
					return String.format`<li><a href="${ 0 }">${ 1 }</a></li>`( series.uri, series.name )
				}
			)
			.join( '' );
	}
}
