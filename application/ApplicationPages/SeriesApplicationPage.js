'use strict';

class SeriesApplicationPage extends AbstractApplicationPage
{
	get #episodeNameHandler()
	{
		return ( container ) =>
		{
			return container
				.childNodes[ 0 ]
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
				.exec( window.location.href )
				.groups
				.uri;

			return String.format`${ 0 }/${ 1 }`( extractedUri, this._settings.get( 'preferredLanguage' ) );
		}
	}

	#determineEpisodes()
	{
		return new Episodes( '#sp_left h2', null, this.#episodeNameHandler, this.#episodeUriHandler );
	}

	async #filterDenialsAsync( episodes )
	{
		const seriesDenialsFilter = new SeriesDenialsFilter( episodes, this._apiController, false );
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
		const linkExtender = new LinkExtender(
			String.format`/${ 0 }`(
				this._settings.get( 'defaultPlayer' )
			)
		);
		await linkExtender.extendLinkListAsync(
			DomHelper.querySelectorAll( '.episodes tbody tr td:nth-child( 1 ) a, .episodes tbody tr td:nth-child( 2 ) a:nth-child( 2 ), #episodes ul li a', document, false )
		);

		return linkExtender;
	}

	async #addActionsAsync( episodes, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher )
	{
		await ( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, null, interestsSwitcher, null, favoritesSwitcher, null, watchedSwitcher ) )
			.addActionsAsync();
	}

	async #addNavigationAsync( linkExtender )
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) ).isSeasonPage )
		{
			await ( new EpisodesController( linkExtender ) )
				.addActionsAsync();
		}
	}

	async #removeMetaLinksAsync()
	{
		await ( new MetaLinksRemover( '#sp_right > a' ) )
			.removeMetaLinksAsync();
	}

	async #removeDescriptionAsync()
	{
		await ( new DescriptionRemover( '#description' ) )
			.removeDescriptionAsync();
	}

	async #scrollToBottomAsync()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) ).isSeasonPage )
		{
			await ( new Scroller() )
				.scrollToElementTopAsync(
					DomHelper.querySelector( '[data-control-type="EPISODES_NAVIGATOR"]', document )
				);
		}
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

		const linkExtender = await this.#extendEpisodesLinksAsync( episodes );
		this.#addNavigationAsync( linkExtender );
		this.#removeMetaLinksAsync();
		this.#removeDescriptionAsync();
		this.#scrollToBottomAsync();
	}
}
