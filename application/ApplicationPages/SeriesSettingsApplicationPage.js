'use strict';

class SeriesSettingsApplicationPage extends AbstractApplicationPage
{
	get #episodeNameHandler()
	{
		return ( container ) =>
		{
			return container
				.textContent
				.trim()
				.toLowerCase();
		}
	}

	get #episodeUriHandler()
	{
		return ( container ) =>
		{
			return null;
		}
	}

	#determineEpisodes()
	{
		return new Episodes( '#usrCnt li', null, this.#episodeNameHandler, this.#episodeUriHandler );
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

	async #addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher )
	{
		await ( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, null, interestsSwitcher, null, favoritesSwitcher, null, watchedSwitcher ) )
			.addActionsAsync();
	}

	async executeAsync()
	{
		const episodes = this.#determineEpisodes();

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
	}
}
