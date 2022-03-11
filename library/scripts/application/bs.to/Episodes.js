'use strict';

class Episodes extends BaseClass
{
	constructor( selector, nameHandler )
	{
		super();

		this._selector    = selector;
		this._nameHandler = nameHandler;
		this._series      = [];

		this._determineEpisodes();
	}

	get series()
	{
		return this._series;
	}

	_determineEpisodes()
	{
		document
			.querySelectorAll( this._selector )
			.forEach(
				( series ) =>
				{
					const processedSeries = new Series( series, this._nameHandler );
					this._series.push( processedSeries );

					DomHelper.setAttribute( processedSeries.container, 'data-is-series', SeriesIsSeries.TRUE );
				}
			);
	}

	remove( name )
	{
		const indices = [];
		this
			._series
			.forEach(
				( series, index ) =>
				{
					if ( series.name === name.toLowerCase() )
					{
						indices.push( index );
						series.remove();
					}
				}
			);
		indices
			.reverse()
			.forEach(
				( index ) =>
				{
					this._series.splice( index, 1 );
				}
			);
	}
}
