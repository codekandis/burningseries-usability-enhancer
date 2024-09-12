'use strict';

class AllSeriesApplicationPage extends AbstractApplicationPage
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
		}
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
		}
	}

	async #removeHeadLineAsync()
	{
		( new HeadLineRemover( '#root section h2' ) )
			.removeHeadLineAsync();
	}

	async #removeSorterAsync()
	{
		await ( new SorterRemover( '#root section p' ) )
			.removeSorterAsync();
	}

	#determineEpisodes()
	{
		return new Episodes( '#seriesContainer ul li', null, this.#episodeNameHandler, this.#episodeUriHandler );
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

	async #extendEpisodesLinksAsync( episodes )
	{
		( new LinkExtender(
			String.format`/${ 0 }`(
				this._settings.get( 'defaultLanguage' )
			)
		) )
			.extendLinkListAsync(
				DomHelper.querySelectorAll( '#seriesContainer ul li a', document, false )
			);
	}

	async #addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher )
	{
		await ( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, null, interestsSwitcher, null, favoritesSwitcher, null, watchedSwitcher ) )
			.addActionsAsync();
	}

	async #addVisibilityTogglerAsync( episodes )
	{
		( new VisibilityTogglerAdder( episodes ) )
			.addVisibilityTogglerAsync();
	}

	async executeAsync()
	{
		this.#removeHeadLineAsync();
		this.#removeSorterAsync();

		const episodes               = this.#determineEpisodes();
		const denialsFilter          = await this.#filterDenialsAsync( episodes );
		const switchDenialsAwaiter   = this.#switchDenialsAsync( episodes );
		const switchInterestsAwaiter = this.#switchInterestsAsync( episodes );
		const switchFavoritesAwaiter = this.#switchFavoritesAsync( episodes );
		const switchWatchedAwaiter   = this.#switchWatchedAsync( episodes );

		const denialsSwitcher   = await switchDenialsAwaiter;
		const interestsSwitcher = await switchInterestsAwaiter;
		const favoritesSwitcher = await switchFavoritesAwaiter;
		const watchedSwitcher   = await switchWatchedAwaiter;

		this.#extendEpisodesLinksAsync( episodes );
		this.#addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher );

		this.#addVisibilityTogglerAsync( episodes );
	}
}
