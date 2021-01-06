class SeriesPage
{
	constructor( settings )
	{
		this._settings      = settings;
		this._episodes      = new Episodes( '#sp_left h2', this._episodeNameHandler );
		this._apiController = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
	}

	_episodeNameHandler( container )
	{
		return container
			.childNodes[ 0 ]
			.textContent
			.trim()
			.toLowerCase();
	}

	_filterEpisodes()
	{
		return ( new EpisodesFilter( this._episodes, this._apiController, false ) )
			.filter();
	}

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController, false ) )
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
