'use strict';

class SeriesSettingsPage extends BaseClass
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
		this.#_episodes          = new Episodes( '#usrCnt li', this.#episodeNameHandler, this.#episodeUriHandler );
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

	#filterDenials()
	{
		return this.#_denialsFilter.filter();
	}

	#addActions()
	{
		( new ActionAdder( this.#_episodes, this.#_apiController, DomInsertPositions.AFTER_BEGIN, this.#_denialsFilter, this.#_denialsSwitcher, this.#_interestsSwitcher, this.#_favoritesSwitcher, this.#_watchedSwitcher ) )
			.addActions();
	}

	execute()
	{
		this.#filterDenials()
			.then(
				() =>
				{
					this.#addActions();
					this.#_denialsSwitcher.switch();
					this.#_interestsSwitcher.switch();
					this.#_favoritesSwitcher.switch();
					this.#_watchedSwitcher.switch();
				}
			);
	}
}
