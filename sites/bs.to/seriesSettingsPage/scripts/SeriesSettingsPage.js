'use strict';

class SeriesSettingsPage extends BaseClass
{
	constructor( settings )
	{
		super();

		this._settings      = settings;
		this._apiController = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
		this._episodes      = new Episodes( '#usrCnt li', this._episodeNameHandler );
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
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, episodesFilter ) )
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
