'use strict';

class SeriesApplicationPage extends AbstractApplicationPage
{
	#_linkExtender;
	#_episodes;
	#_denialsFilter;
	#_denialsSwitcher;
	#_interestsSwitcher;
	#_favoritesSwitcher;
	#_watchedSwitcher;

	constructor( settings, applicationPageArguments )
	{
		super( settings, applicationPageArguments );

		this.#_linkExtender      = new LinkExtender(
			'/' + this._settings.get( 'defaultPlayer' )
		);
		this.#_episodes          = new Episodes( '#sp_left h2', null, this.#episodeNameHandler, this.#episodeUriHandler );
		this.#_denialsFilter     = new SeriesDenialsFilter( this.#_episodes, this._apiController, false );
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
		await ( new ActionAdder( this.#_episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, null, this.#_interestsSwitcher, null, this.#_favoritesSwitcher, null, this.#_watchedSwitcher ) )
			.addActionsAsync();
	}

	async #extendEpisodesLinksAsync()
	{
		await this.#_linkExtender.extendLinkListAsync(
			DomHelper.querySelectorAll( '.episodes tbody tr td:nth-child( 1 ) a, .episodes tbody tr td:nth-child( 2 ) a:nth-child( 2 ), #episodes ul li a', document, false )
		);
	}

	async #addNavigationAsync()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) ).isSeasonPage )
		{
			await ( new EpisodesController( this.#_linkExtender ) )
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
		this
			.#filterDenialsAsync()
			.then(
				async () =>
				{
					this.#switchDenialsAsync();
					this.#switchInterestsAsync();
					this.#switchFavoritesAsync();
					this.#switchWatchedAsync();
					this.#addActionsAsync();
				}
			);
		this.#extendEpisodesLinksAsync();
		this.#addNavigationAsync();
		this.#removeMetaLinksAsync();
		this.#removeDescriptionAsync();
		this.#scrollToBottomAsync();
	}
}
