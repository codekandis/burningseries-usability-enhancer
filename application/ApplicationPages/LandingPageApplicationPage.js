'use strict';

class LandingPageApplicationPage extends AbstractApplicationPage
{
	get #episodeNameHandler()
	{
		return ( container ) =>
		{
			return DomHelper
				.querySelector( 'a', container )
				.textContent
				.trim()
				.toLowerCase();
		};
	}

	get #episodeUriHandler()
	{
		return ( container ) =>
		{
			const extractedUri = /^.+?\/.+?\/(?<uri>serie\/.+?)(?:\/.+)?$/
				.exec(
					DomHelper
						.querySelector( 'a', container )
						.href
				)
				.groups
				.uri;

			return String.format`${ 0 }/${ 1 }`( extractedUri, this._settings.get( 'preferredLanguage' ) );
		};
	}

	async #removeTeaserAsync()
	{
		( new TeaserRemover( '#teaser' ) )
			.removeTeaserAsync();
	}

	async #removeNewsAsync()
	{
		( new NewsRemover( '#news' ) )
			.removeNewsAsync();
	}

	async #removeHeadLineAsync()
	{
		( new HeadLineRemover( '.home > h2' ) )
			.removeHeadLineAsync();
	}

	async #loadNewestEpisodesAsync()
	{
		return await ( new NewestEpisodesLoader( this._bsToController ) )
			.loadAsync();
	}

	async #loadNewestSeriesAsync()
	{
		return await ( new NewestSeriesLoader( this._bsToController ) )
			.loadAsync();
	}

	#determineEpisodesConfigurations( newestEpisodes, newestSeries )
	{
		return [
			{
				episodes:     new Episodes( '#newest_episodes ul li', newestEpisodes, this.#episodeNameHandler, this.#episodeUriHandler ),
				replacer:     new Replacer( '#newest_episodes', newestEpisodes ),
				linkSelector: '#newest_episodes ul li a',
				linkExtender: new LinkExtender(
					String.format`/${ 0 }`(
						this._settings.get( 'defaultPlayer' )
					)
				)
			},
			{
				episodes:     new Episodes( '#newest_series ul li', newestSeries, this.#episodeNameHandler, this.#episodeUriHandler ),
				replacer:     new Replacer( '#newest_series', newestSeries ),
				linkSelector: '#newest_series ul li a',
				linkExtender: new LinkExtender(
					String.format`/${ 0 }`(
						this._settings.get( 'preferredLanguage' )
					)
				)
			}
		];
	}

	async #filterDenialsAsync( episodes )
	{
		const seriesDenialsFilter = new SeriesDenialsFilter( episodes, this._apiController, true );
		await seriesDenialsFilter.filterSeriesDenialsAsync();

		return seriesDenialsFilter;
	}

	async #switchDenialsAsync( episodes )
	{
		const seriesDenialsSwitcher = new SeriesDenialsSwitcher( episodes, this._apiController );
		seriesDenialsSwitcher.switchSeriesDenialsAsync();

		return seriesDenialsSwitcher;
	}

	async #switchInterestsAsync( episodes )
	{
		const seriesInterestsSwitcher = new SeriesInterestsSwitcher( episodes, this._apiController );
		seriesInterestsSwitcher.switchSeriesInterestsAsync();

		return seriesInterestsSwitcher;
	}

	async #switchFavoritesAsync( episodes )
	{
		const seriesFavoritesSwitcher = new SeriesFavoritesSwitcher( episodes, this._apiController );
		seriesFavoritesSwitcher.switchSeriesFavoritesAsync();

		return seriesFavoritesSwitcher;
	}

	async #switchWatchedAsync( episodes )
	{
		const seriesWatchedSwitcher = new SeriesWatchedSwitcher( episodes, this._apiController );
		seriesWatchedSwitcher.switchSeriesWatchedAsync();

		return seriesWatchedSwitcher;
	}

	async #extendEpisodesLinksAsync( episodes, linkSelector, linkExtender )
	{
		episodes
			.series
			.forEach(
				async ( series ) =>
				{
					linkExtender.extendLinkListAsync(
						DomHelper.querySelectorAll( 'a', series.container )
					);
				}
			);
	}

	async #addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher )
	{
		await ( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, null, interestsSwitcher, null, favoritesSwitcher, null, watchedSwitcher ) )
			.addActionsAsync();
	}

	async #removeSeriesTitleAttributesAsync( episodes )
	{
		await ( new SeriesTitleAttributeRemover( episodes ) )
			.removeTitleAttributesAsync();
	}

	async #addSeriesAbstractsAsync( episodes )
	{
		await ( new SeriesAbstractsAdder( episodes, this._bsToController ) )
			.addSeriesAbstractsAsync();
	}

	async #replaceEpisodesAsync( episodesReplacer )
	{
		episodesReplacer.replaceAsync();
	}

	async executeAsync()
	{
		this.#removeTeaserAsync();
		this.#removeHeadLineAsync();
		this.#removeNewsAsync();

		( new IntervalExecutor(
			5000,
			async () =>
			{
				const loadNewestEpisodesAwaiter = this.#loadNewestEpisodesAsync();
				const loadNewestSeriesAwaiter   = this.#loadNewestSeriesAsync();

				const newestEpisodes = await loadNewestEpisodesAwaiter;
				const newestSeries   = await loadNewestSeriesAwaiter;

				this.#determineEpisodesConfigurations( newestEpisodes, newestSeries )
					.forEach(
						async ( episodesConfiguration ) =>
						{
							const denialsFilter          = await this.#filterDenialsAsync( episodesConfiguration.episodes );
							const switchDenialsAwaiter   = this.#switchDenialsAsync( episodesConfiguration.episodes );
							const switchInterestsAwaiter = this.#switchInterestsAsync( episodesConfiguration.episodes );
							const switchFavoritesAwaiter = this.#switchFavoritesAsync( episodesConfiguration.episodes );
							const switchWatchedAwaiter   = this.#switchWatchedAsync( episodesConfiguration.episodes );

							const denialsSwitcher   = await switchDenialsAwaiter;
							const interestsSwitcher = await switchInterestsAwaiter;
							const favoritesSwitcher = await switchFavoritesAwaiter;
							const watchedSwitcher   = await switchWatchedAwaiter;

							this.#extendEpisodesLinksAsync( episodesConfiguration.episodes, episodesConfiguration.linkSelector, episodesConfiguration.linkExtender );
							this.#addActionsAsync( episodesConfiguration.episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher );
							this.#removeSeriesTitleAttributesAsync( episodesConfiguration.episodes );
							this.#addSeriesAbstractsAsync( episodesConfiguration.episodes );

							this.#replaceEpisodesAsync( episodesConfiguration.replacer );
						}
					);
			}
		) )
			.executeAsync( true );
	}
}
