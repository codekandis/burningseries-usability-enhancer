console.log( 'codekandis/burningseries-latest-episodes-cleaner: sites/landingPage/scripts/landingPage' );

class LandingPage
{
	constructor( settings )
	{
		this._settings = settings;
	}

	execute()
	{
		this._filterLatestEpisodes();
	}

	_filterLatestEpisodes()
	{
		const addSeries = ( event ) =>
		{
			event.preventDefault();
		};

		( new LatestEpisodesFilter(
			new LatestEpisodes(),
			this._apiController = new ApiController(
				this._settings.get( 'apiBaseUri' ),
				this._settings.get( 'apiUserId' ),
				this._settings.get( 'apiKey' )
			)
		) )
			.filter();
	}
}
