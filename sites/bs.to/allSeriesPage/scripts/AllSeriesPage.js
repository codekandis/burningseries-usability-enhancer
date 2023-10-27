'use strict';

class AllSeriesPage extends BaseClass
{
	#_settings;
	#_apiController;
	#_episodes;
	#_denialsFilter;
	#_denialsSwitcher;
	#_interestsSwitcher;
	#_favoritesSwitcher;
	#_watchedSwitcher;

	constructor( settings )
	{
		super();

		this.#_settings          = settings;
		this.#_apiController     = new ApiController(
			settings.get( 'apiBaseUri' ),
			settings.get( 'apiUserId' ),
			settings.get( 'apiKey' )
		);
		this.#_episodes          = new Episodes( '#seriesContainer ul li', this.#episodeNameHandler, this.#episodeUriHandler );
		this.#_denialsFilter     = new SeriesDenialsFilter( this.#_episodes, this.#_apiController, true );
		this.#_denialsSwitcher   = new SeriesDenialsSwitcher( this.#_episodes, this.#_apiController );
		this.#_interestsSwitcher = new SeriesInterestsSwitcher( this.#_episodes, this.#_apiController );
		this.#_favoritesSwitcher = new SeriesFavoritesSwitcher( this.#_episodes, this.#_apiController );
		this.#_watchedSwitcher   = new SeriesWatchedSwitcher( this.#_episodes, this.#_apiController );
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

			return String.format`${ 0 }/${ 1 }`( extractedUri, this.#_settings.get( 'preferredLanguage' ) );
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

	#addActions()
	{
		( new ActionAdder( this.#_episodes, this.#_apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, this.#_interestsSwitcher, this.#_favoritesSwitcher, this.#_watchedSwitcher ) )
			.addActions();
	}

	execute()
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
	}
}
