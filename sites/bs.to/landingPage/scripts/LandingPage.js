'use strict';

class LandingPage extends BaseClass
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
		this._linkExtender  = new LinkExtender( '/' + this._settings.get( 'defaultPlayer' ) );
		this._episodes      = new Episodes( '#newest_episodes ul li, #newest_series ul li', this._episodeNameHandler );
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

	_extendEpisodesLinks()
	{
		this._linkExtender.extendList(
			document.querySelectorAll( '#newest_episodes ul li a' )
		);
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
					this._extendEpisodesLinks();
					this._addActions( episodesFilter );
				}
			);
	}
}
