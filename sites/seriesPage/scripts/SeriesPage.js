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

	get _isSeasonPage()
	{
		let isSeasonPage = false;
		[
			/^https:\/\/bs.to\/serie\/.+?\/\d+(?:\/[a-z]+)?\/?$/i,
			/^https:\/\/burningseries.co\/serie\/.+?\/\d+(?:\/[a-z]+)?\/?$/i
		].forEach(
			( regularExpression ) =>
			{
				isSeasonPage ||= regularExpression.test( window.location.href );
			}
		);

		return isSeasonPage;
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

	_addActions( episodesFilter )
	{
		( new ActionAdder( this._episodes, this._apiController, 'beforeend', episodesFilter ) )
			.addActions();
	}

	_addNavigation()
	{
		( new EpisodesNavigator() )
			.addNavigation();
	}

	execute()
	{
		this
			._filterEpisodes()
			.then(
				( episodesFilter ) =>
				{
					this._addActions( episodesFilter );
					if ( false === this._isSeasonPage )
					{
						this._addNavigation();
					}
				}
			);
	}
}
