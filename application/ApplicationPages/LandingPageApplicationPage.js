'use strict';

class LandingPageApplicationPage extends AbstractApplicationPage
{
	#_linkExtender;
	#_episodes;
	#_denialsFilter;
	#_denialsSwitcher;
	#_interestsSwitcher;
	#_favoritesSwitcher;
	#_watchedSwitcher;
	#_teaserRemover;
	#_headLineRemover;
	#_newsRemover;

	constructor( settings, applicationPageArguments )
	{
		super( settings, applicationPageArguments );

		this.#_linkExtender      = new LinkExtender(
			'/' + this._settings.get( 'defaultPlayer' )
		);
		this.#_episodes          = new Episodes( '#newest_episodes ul li, #newest_series ul li', this.#episodeNameHandler, this.#episodeUriHandler );
		this.#_denialsFilter     = new SeriesDenialsFilter( this.#_episodes, this._apiController, true );
		this.#_denialsSwitcher   = new SeriesDenialsSwitcher( this.#_episodes, this._apiController );
		this.#_interestsSwitcher = new SeriesInterestsSwitcher( this.#_episodes, this._apiController );
		this.#_favoritesSwitcher = new SeriesFavoritesSwitcher( this.#_episodes, this._apiController );
		this.#_watchedSwitcher   = new SeriesWatchedSwitcher( this.#_episodes, this._apiController );
		this.#_teaserRemover     = new TeaserRemover( '#teaser' );
		this.#_headLineRemover   = new HeadLineRemover( '.home > h2' );
		this.#_newsRemover       = new NewsRemover( '#news' );
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

	async #filterDenialsAsync()
	{
		return this.#_denialsFilter.filterSeriesDenialsAsync();
	}

	async #extendEpisodesLinksAsync()
	{
		await this.#_linkExtender.extendLinkListAsync(
			DomHelper.querySelectorAll( '#newest_episodes ul li a', document, false )
		);
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

	async #removeSeriesTitleAttributesAsync()
	{
		await ( new SeriesTitleAttributeRemover( this.#_episodes ) )
			.removeTitleAttributesAsync();
	}

	async #addActionsAsync()
	{
		await ( new ActionAdder( this.#_episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, null, this.#_interestsSwitcher, null, this.#_favoritesSwitcher, null, this.#_watchedSwitcher ) )
			.addActionsAsync();
	}

	async #addSeriesAbstractsAsync()
	{
		await ( new SeriesAbstractsAdder( this.#_episodes, this._bsToController ) )
			.addSeriesAbstractsAsync();
	}

	async executeAsync()
	{
		this.#removeTeaserAsync();
		this.#removeHeadLineAsync();
		this.#removeNewsAsync();
		this.#filterDenialsAsync()
			.then(
				async () =>
				{
					this.#extendEpisodesLinksAsync();
					this.#switchDenialsAsync();
					this.#switchInterestsAsync();
					this.#switchFavoritesAsync();
					this.#switchWatchedAsync();
					this.#removeSeriesTitleAttributesAsync();
					this.#addActionsAsync();
					this.#addSeriesAbstractsAsync();
				}
			);
	}
}
