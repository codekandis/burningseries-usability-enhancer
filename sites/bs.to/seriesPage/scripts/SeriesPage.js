'use strict';

class SeriesPage extends BaseClass
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
		this._episodes      = new Episodes( '#sp_left h2', this._episodeNameHandler );
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

	_extendEpisodesLinks()
	{
		this._linkExtender.extendList(
			document.querySelectorAll( '.episodes tbody tr td:nth-child( 1 ) a, .episodes tbody tr td:nth-child( 2 ) a:nth-child( 2 ), #episodes ul li a' )
		);
	}

	_addActions( episodesFilter )
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, episodesFilter ) )
			.addActions();
	}

	_addNavigation()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) )._isSeasonPage )
		{
			( new EpisodesNavigator( this._linkExtender ) )
				.addNavigation();
		}
	}

	_removeDescription()
	{
		( new DescriptionRemover( '#description' ) )
			.remove();
	}

	_scrollToBottom()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) )._isSeasonPage )
		{
			( new Scroller() )
				.scrollToElementTop( document.querySelector( '.codekandis-episodesNavigator.top' ) );
		}
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
		this._extendEpisodesLinks();
		this._addNavigation();
		this._removeDescription();
		this._scrollToBottom();
	}
}
