'use strict';

class Episodes extends BaseClass
{
	#_selector;
	#_nameHandler;
	#_uriHandler;
	#_series = [];

	constructor( selector, nameHandler, uriHandler )
	{
		super();

		this.#_selector    = selector;
		this.#_nameHandler = nameHandler;
		this.#_uriHandler  = uriHandler;

		this.#determineEpisodesAsync();
	}

	get series()
	{
		return this.#_series;
	}

	async #findAllSeriesAsync( series )
	{
		return this.#_series
			.filter(
				( seriesFetched ) =>
				{
					return seriesFetched.name === series.name.toLowerCase();
				}
			);
	}

	async #determineEpisodesAsync()
	{
		DomHelper
			.querySelectorAll( this.#_selector, document, false )
			.forEach(
				( series ) =>
				{
					const seriesName = this.#_nameHandler( series );

					if ( null === seriesName )
					{
						return;
					}

					const seriesUri          = this.#_uriHandler( series );
					const processedSeries    = new Series( series, seriesName, seriesUri );
					processedSeries.isSeries = true;
					this.#_series.push( processedSeries );
				}
			);
	}

	async switchDenialAsync( series, isDenial )
	{
		const denialId = false === isDenial
			? null
			: series.id;

		this.#findAllSeriesAsync( series )
			.then(
				async ( series ) =>
				{
					series.forEach(
						( seriesFetched ) =>
						{
							seriesFetched.isDenial = isDenial;
							seriesFetched.denialId = denialId;
						}
					);
				}
			);
	}

	async switchInterestAsync( series, isInterest )
	{
		const interestId = false === isInterest
			? null
			: series.id;

		this.#findAllSeriesAsync( series )
			.then(
				async ( series ) =>
				{
					series.forEach(
						( seriesFetched ) =>
						{
							seriesFetched.isInterest = isInterest;
							seriesFetched.interestId = interestId;
						}
					);
				}
			);
	}

	async switchFavoriteAsync( series, isFavorite )
	{
		const favoriteId = false === isFavorite
			? null
			: series.id;

		this.#findAllSeriesAsync( series )
			.then(
				async ( series ) =>
				{
					series.forEach(
						( seriesFetched ) =>
						{
							seriesFetched.isFavorite = isFavorite;
							seriesFetched.favoriteId = favoriteId;
						}
					);
				}
			);
	}

	async switchWatchAsync( series, isWatch )
	{
		const watchId = false === isWatch
			? null
			: series.id;

		this.#findAllSeriesAsync( series )
			.then(
				async ( series ) =>
				{
					series.forEach(
						( seriesFetched ) =>
						{
							seriesFetched.isWatch = isWatch;
							seriesFetched.watchId = watchId;
						}
					)
				}
			);
	}

	async removeEpisodeAsync( series )
	{
		this
			.#_series
			.reduce(
				( filteredIndices, seriesFetched, index ) =>
				{
					if ( seriesFetched.name === series.name.toLowerCase() )
					{
						filteredIndices.push( index );
						seriesFetched.removeSeriesAsync();
					}

					return filteredIndices;
				},
				[]
			)
			.reverse()
			.forEach(
				( index ) =>
				{
					this.#_series.splice( index, 1 );
				}
			);
	}
}
