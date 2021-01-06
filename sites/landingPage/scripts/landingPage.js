class LandingPage
{
	constructor( settings )
	{
		this._settings      = settings;
		this._episodes      = new Episodes( '#newest_episodes ul li, #newest_series ul li', this._episodeNameHandler );
		this._apiController = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
	}

	_episodeNameHandler( container )
	{
		return container
			.querySelector( 'a' )
			.textContent
			.trim()
			.toLowerCase();
	}

	_filterEpisodes()
	{
		return ( new EpisodesFilter( this._episodes, this._apiController, true ) )
			.filter();
	}

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController, true ) )
			.addActions()
	}

	execute()
	{
		this
			._filterEpisodes()
			.then(
				() =>
				{
					this._addActions();
				}
			);
	}
}
