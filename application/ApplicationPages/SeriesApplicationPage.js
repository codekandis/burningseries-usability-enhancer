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
		this.#_episodes          = new Episodes( '#sp_left h2', this.#episodeNameHandler, this.#episodeUriHandler );
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

	#filterDenials()
	{
		return this.#_denialsFilter.filter();
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

	#extendEpisodesLinks()
	{
		this.#_linkExtender.extendList(
			DomHelper.querySelectorAll( '.episodes tbody tr td:nth-child( 1 ) a, .episodes tbody tr td:nth-child( 2 ) a:nth-child( 2 ), #episodes ul li a', document, false )
		);
	}

	#addActions()
	{
		( new ActionAdder( this.#_episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, null, this.#_interestsSwitcher, null, this.#_favoritesSwitcher, null, this.#_watchedSwitcher ) )
			.addActions();
	}

	#addNavigation()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) ).isSeasonPage )
		{
			( new EpisodesController( this.#_linkExtender ) )
				.addActions();
		}
	}

	#removeMetaLinks()
	{
		( new MetaLinksRemover( '#sp_right > a' ) )
			.remove();
	}

	#removeDescription()
	{
		( new DescriptionRemover( '#description' ) )
			.remove();
	}

	#scrollToBottom()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) ).isSeasonPage )
		{
			( new Scroller() )
				.scrollToElementTop(
					DomHelper.querySelector( '[data-control-type="EPISODES_NAVIGATOR"]', document )
				);
		}
	}

	async execute()
	{
		this
			.#filterDenials()
			.then(
				() =>
				{
					this.#addActions();
					this.#switchDenials();
					this.#switchInterests();
					this.#switchFavorites();
					this.#switchWatched();
				}
			);
		this.#extendEpisodesLinks();
		this.#addNavigation();
		this.#removeMetaLinks();
		this.#removeDescription();
		this.#scrollToBottom();
	}
}
