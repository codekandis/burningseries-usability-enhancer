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
		this._episodes      = new Episodes( '#usrCnt li', this._episodeNameHandler, this._episodeUriHandler );
	}

	get _episodeNameHandler()
	{
		return ( container ) =>
		{
			return container
				.textContent
				.trim()
				.toLowerCase();
		}
	}

	get _episodeUriHandler()
	{
		return ( container ) =>
		{
			return null;
		}
	}

	_filterDenials()
	{
		return this._denialsFilter.filter();
	}

	execute()
	{
		this._filterDenials();
	}
}
