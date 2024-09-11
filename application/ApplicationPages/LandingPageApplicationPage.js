'use strict';

class LandingPageApplicationPage extends AbstractApplicationPage
{
	#_teaserRemover;
	#_headLineRemover;
	#_newsRemover;

	constructor( settings, applicationPageArguments )
	{
		super( settings, applicationPageArguments );

		this.#_teaserRemover   = new TeaserRemover( '#teaser' );
		this.#_headLineRemover = new HeadLineRemover( '.home > h2' );
		this.#_newsRemover     = new NewsRemover( '#news' );
	}

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
		this.#_teaserRemover.removeTeaserAsync();
	}

	async #removeNewsAsync()
	{
		this.#_newsRemover.removeNewsAsync();
	}

	async #removeHeadLineAsync()
	{
		this.#_headLineRemover.removeHeadLineAsync();
	}

	async #loadNewestEpisodesAsync()
	{
		await ( new NewestEpisodesLoader( this._bsToController ) )
			.loadAsync();
	}

	async #loadNewestSeriesAsync()
	{
		await ( new NewestSeriesLoader( this._bsToController ) )
			.loadAsync();
	}

	#determineEpisodes()
	{
		return [
			new Episodes( '#newest_episodes ul li', this.#episodeNameHandler, this.#episodeUriHandler ),
			new Episodes( '#newest_series ul li', this.#episodeNameHandler, this.#episodeUriHandler )
		];
	}

	async #extendEpisodesLinksAsync( episodes )
	{
		await new LinkExtender(
			episodes,
			'a',
			'/' + this._settings.get( 'defaultPlayer' )
		)
			.extendLinkListAsync();
	}

	async #filterDenialsAsync( episodes )
	{
		return await new SeriesDenialsFilter( episodes, this._apiController, true )
			.filterSeriesDenialsAsync();
	}

	async #switchDenialsAsync( episodes )
	{
		return await ( new SeriesDenialsSwitcher( episodes, this._apiController ) )
			.switchSeriesDenialsAsync();
	}

	async #switchInterestsAsync( episodes )
	{
		return await ( new SeriesInterestsSwitcher( episodes, this._apiController ) )
			.switchSeriesInterestsAsync();
	}

	async #switchFavoritesAsync( episodes )
	{
		return await ( new SeriesFavoritesSwitcher( episodes, this._apiController ) )
			.switchSeriesFavoritesAsync();
	}

	async #switchWatchedAsync( episodes )
	{
		return await ( new SeriesWatchedSwitcher( episodes, this._apiController ) )
			.switchSeriesWatchedAsync();
	}

	async #removeSeriesTitleAttributesAsync( episodes )
	{
		await ( new SeriesTitleAttributeRemover( episodes ) )
			.removeTitleAttributesAsync();
	}

	async #addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher )
	{
		await ( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, null, interestsSwitcher, null, favoritesSwitcher, null, watchedSwitcher ) )
			.addActionsAsync();
	}

	async #addSeriesAbstractsAsync( episodes )
	{
		await ( new SeriesAbstractsAdder( episodes, this._bsToController ) )
			.addSeriesAbstractsAsync();
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

				await loadNewestEpisodesAwaiter;
				await loadNewestSeriesAwaiter;

				const episodes = this.#determineEpisodes();
				this.#extendEpisodesLinksAsync( episodes[ 0 ] );
				episodes.forEach(
					async ( episodes ) =>
					{
						const denialsFilter          = await this.#filterDenialsAsync( episodes );
						const switchDenialsAwaiter   = this.#switchDenialsAsync( episodes );
						const switchInterestsAwaiter = this.#switchInterestsAsync( episodes );
						const switchFavoritesAwaiter = this.#switchFavoritesAsync( episodes );
						const switchWatchedAwaiter   = this.#switchWatchedAsync( episodes );

						const denialsSwitcher   = await switchDenialsAwaiter;
						const interestsSwitcher = await switchInterestsAwaiter;
						const favoritesSwitcher = await switchFavoritesAwaiter;
						const watchedSwitcher   = await switchWatchedAwaiter;

						this.#addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher );

						this.#removeSeriesTitleAttributesAsync( episodes );
						this.#addSeriesAbstractsAsync( episodes );
					}
				);
			}
		) )
			.executeAsync( true );
	}
}
