class AllSeriesPage
{
	constructor( settings )
	{
		this._settings      = settings;
		this._episodes      = new Episodes( '#seriesContainer ul li' );
		this._apiController = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
	}

	_filterEpisodes()
	{
		return ( new EpisodesFilter( this._episodes, this._apiController ) )
			.filter();
	}

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController ) )
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
