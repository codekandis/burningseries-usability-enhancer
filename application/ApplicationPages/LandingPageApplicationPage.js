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

	#removeTeaser()
	{
		this.#_teaserRemover.remove();
	}

	#removeHeadLine()
	{
		this.#_headLineRemover.remove();
	}

	#filterDenials()
	{
		return this.#_denialsFilter.filter();
	}

	#extendEpisodesLinks()
	{
		this.#_linkExtender.extendList(
			DomHelper.querySelectorAll( '#newest_episodes ul li a', document, false )
		);
	}

	#removeSeriesTitleAttributes()
	{
		( new SeriesTitleAttributeRemover( this.#_episodes ) )
			.removeTitleAttributes();
	}

	#addActions()
	{
		( new ActionAdder( this.#_episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, null, this.#_interestsSwitcher, null, this.#_favoritesSwitcher, null, this.#_watchedSwitcher ) )
			.addActions();
	}

	#switchDenials()
	{
		this.#_denialsSwitcher.switch();
	}

	#switchInterests()
	{
		this.#_interestsSwitcher.switch();
	}

	#switchFavorites()
	{
		this.#_favoritesSwitcher.switch();
	}

	#switchWatched()
	{
		this.#_watchedSwitcher.switch();
	}

	async execute()
	{
		this.#removeTeaser();
		this.#removeHeadLine();
		this.#filterDenials()
			.then(
				() =>
				{
					this.#extendEpisodesLinks();
					this.#switchDenials();
					this.#switchInterests();
					this.#switchFavorites();
					this.#switchWatched();
					this.#removeSeriesTitleAttributes();
					this.#addActions();
				}
			);
	}
}
