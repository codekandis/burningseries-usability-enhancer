'use strict';

class Episodes extends BaseClass
{
	constructor( selector, nameHandler, uriHandler )
	{
		super();

		this._selector    = selector;
		this._nameHandler = nameHandler;
		this._uriHandler  = uriHandler;
		this._series      = [];

		this._determineEpisodes();
	}

	get series()
	{
		return this._series;
	}

	_findSeries( series )
	{
		return this._series.find(
			( seriesFetched ) =>
			{
				return seriesFetched.name === series.name.toLowerCase();
			}
		);
	}

	_findAllSeries( series )
	{
		return this._series.filter(
			( seriesFetched ) =>
			{
				return seriesFetched.name === series.name.toLowerCase();
			}
		);
	}

	_determineEpisodes()
	{
		DomHelper
			.querySelectorAll( this._selector, document, false )
			.forEach(
				( series ) =>
				{
					const seriesName = this._nameHandler( series );
					const seriesUri  = this._uriHandler( series );

					if ( null === seriesName || null === seriesUri )
					{
						return;
					}

					const processedSeries    = new Series( series, seriesName, seriesUri );
					processedSeries.isSeries = true;
					this._series.push( processedSeries );
				}
			);
	}

	switchDenial( series, isDenial )
	{
		const denialId = false === isDenial
			? null
			: series.id;

		this._findAllSeries( series )
			.forEach(
				( seriesFetched ) =>
				{
					seriesFetched.isDenial = isDenial;
					seriesFetched.denialId = denialId;
				}
			);
	}

	switchInterest( series, isInterest )
	{
		const interestId = false === isInterest
			? null
			: series.id;

		this._findAllSeries( series )
			.forEach(
				( seriesFetched ) =>
				{
					seriesFetched.isInterest = isInterest;
					seriesFetched.interestId = interestId;
				}
			);
	}

	switchFavorite( series, isFavorite )
	{
		const favoriteId = false === isFavorite
			? null
			: series.id;

		this._findAllSeries( series )
			.forEach(
				( seriesFetched ) =>
				{
					seriesFetched.isFavorite = isFavorite;
					seriesFetched.favoriteId = favoriteId;
				}
			);
	}

	switchWatch( series, isWatch )
	{
		const watchId = false === isWatch
			? null
			: series.id;

		this._findAllSeries( series )
			.forEach(
				( seriesFetched ) =>
				{
					seriesFetched.isWatch = isWatch;
					seriesFetched.watchId = watchId;
				}
			);
	}

	remove( series )
	{
		const indices = [];
		this
			._series
			.forEach(
				( seriesFetched, index ) =>
				{
					if ( seriesFetched.name === series.name.toLowerCase() )
					{
						indices.push( index );
						seriesFetched.remove();
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
