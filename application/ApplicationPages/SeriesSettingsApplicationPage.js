'use strict';

class SeriesSettingsApplicationPage extends AbstractApplicationPage
{
	#_episodes;
	#_denialsFilter;
	#_denialsSwitcher;
	#_interestsSwitcher;
	#_favoritesSwitcher;
	#_watchedSwitcher;

	constructor( settings, applicationPageArguments )
	{
		super( settings, applicationPageArguments );

		this.#_episodes          = new Episodes( '#usrCnt li', null, this.#episodeNameHandler, this.#episodeUriHandler );
		this.#_denialsFilter     = new SeriesDenialsFilter( this.#_episodes, this._apiController, true );
		this.#_denialsSwitcher   = new SeriesDenialsSwitcher( this.#_episodes, this._apiController );
		this.#_interestsSwitcher = new SeriesInterestsSwitcher( this.#_episodes, this._apiController );
		this.#_favoritesSwitcher = new SeriesFavoritesSwitcher( this.#_episodes, this._apiController );
		this.#_watchedSwitcher   = new SeriesWatchedSwitcher( this.#_episodes, this._apiController );
	}

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

	async #filterDenialsAsync()
	{
		return this.#_denialsFilter.filterSeriesDenialsAsync();
	}

	async #switchDenialsAsync()
	{
		await this.#_denialsSwitcher.switchSeriesDenialsAsync();
	}

	async #switchInterestsAsync()
	{
		await this.#_interestsSwitcher.switchSeriesInterestsAsync();
	}

	async #switchFavoritesAsync()
	{
		await this.#_favoritesSwitcher.switchSeriesFavoritesAsync();
	}

	async #switchWatchedAsync()
	{
		await this.#_watchedSwitcher.switchSeriesWatchedAsync();
	}

	async #addActionsAsync()
	{
		( new ActionAdder( this.#_episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, null, this.#_interestsSwitcher, null, this.#_favoritesSwitcher, null, this.#_watchedSwitcher ) )
			.addActionsAsync();
	}

	async executeAsync()
	{
		this.#filterDenialsAsync()
			.then(
				async () =>
				{
					this.#switchDenialsAsync();
					this.#switchInterestsAsync();
					this.#switchFavoritesAsync();
					this.#switchWatchedAsync();
					this.#addActionsAsync();
					this.#addActionsAsync();
				}
			);
	}
}
