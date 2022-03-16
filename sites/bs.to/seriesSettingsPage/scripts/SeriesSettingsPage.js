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

	_filterDenials()
	{
		return ( new DenialsFilter( this._episodes, this._apiController, true ) )
			.filter();
	}

	_addActions( denialsFilter )
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter ) )
			.addActions()
	}

	execute()
	{
		this
			._filterDenials()
			.then(
				( denialsFilter ) =>
				{
					this._addActions( denialsFilter );
				}
			);
	}
}
