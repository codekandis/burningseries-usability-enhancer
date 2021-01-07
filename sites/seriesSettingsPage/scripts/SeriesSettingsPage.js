class SeriesSettingsPage
{
	constructor( settings )
	{
		this._settings      = settings;
		this._episodes      = new Episodes( '#waste1 li, #waste2 li', this._episodeNameHandler );
		this._apiController = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
	}

	_episodeNameHandler( container )
	{
		return container
			.textContent
			.trim()
			.toLowerCase();
	}

	_filterEpisodes()
	{
		return ( new EpisodesFilter( this._episodes, this._apiController, true ) )
			.filter();
	}

	_addActions( episodesFilter )
	{
		( new ActionAdder( this._episodes, this._apiController, 'afterbegin', episodesFilter ) )
			.addActions()
	}

	execute()
	{
		this
			._filterEpisodes()
			.then(
				( episodesFilter ) =>
				{
					this._addActions( episodesFilter );
				}
			);
	}
}
