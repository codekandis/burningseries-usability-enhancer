'use strict';

class SeriesPage extends BaseClass
{
	constructor( settings )
	{
		super();

		this._settings          = settings;
		this._apiController     = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
		this._linkExtender      = new LinkExtender(
			'/' + this._settings.get( 'defaultPlayer' )
		);
		this._episodes          = new Episodes( '#sp_left h2', this._episodeNameHandler, this._episodeUriHandler );
		this._denialsFilter     = new SeriesDenialsFilter( this._episodes, this._apiController, false );
		this._denialsSwitcher   = new SeriesDenialsSwitcher( this._episodes, this._apiController );
		this._interestsSwitcher = new SeriesInterestsSwitcher( this._episodes, this._apiController );
		this._favoritesSwitcher = new SeriesFavoritesSwitcher( this._episodes, this._apiController );
		this._watchedSwitcher   = new SeriesWatchedSwitcher( this._episodes, this._apiController );
	}

	get _episodeNameHandler()
	{
		return ( container ) =>
		{
			return container
				.childNodes[ 0 ]
				.textContent
				.trim()
				.toLowerCase();
		}
	}

	get _episodeUriHandler()
	{
		return ( container ) =>
		{
			const extractedUri = /^.+?\/.+?\/(?<uri>serie\/.+?)(?:\/.+)?$/
				.exec( window.location.href )
				.groups
				.uri;

			return String.format`${ 0 }/${ 1 }`( extractedUri, this._settings.get( 'preferredLanguage' ) );
		}
	}

	_filterDenials()
	{
		return this._denialsFilter.filter();
	}

	_switchDenials()
	{
		this._denialsSwitcher.switch();
	}

	_switchInterests()
	{
		this._interestsSwitcher.switch();
	}

	_switchFavorites()
	{
		this._favoritesSwitcher.switch();
	}

	_switchWatched()
	{
		this._watchedSwitcher.switch();
	}

	_extendEpisodesLinks()
	{
		this._linkExtender.extendList(
			DomHelper.querySelectorAll( '.episodes tbody tr td:nth-child( 1 ) a, .episodes tbody tr td:nth-child( 2 ) a:nth-child( 2 ), #episodes ul li a', document, false )
		);
	}

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this._denialsFilter, this._denialsSwitcher, this._interestsSwitcher, this._favoritesSwitcher, this._watchedSwitcher ) )
			.addActions();
	}

	_addNavigation()
	{
		if ( false === ( new SeasonPageDeterminator( window.location.href ) )._isSeasonPage )
		{
			( new EpisodesController( this._linkExtender ) )
				.addActions();
		}
	}

	_removeMetaLinks()
	{
		( new MetaLinksRemover( '#sp_right > a' ) )
			.remove();
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
				.scrollToElementTop(
					DomHelper.querySelector( '[data-control-type="EPISODES_NAVIGATOR"]', document )
				);
		}
	}

	execute()
	{
		this
			._filterDenials()
			.then(
				() =>
				{
					this._addActions();
					this._switchDenials();
					this._switchInterests();
					this._switchFavorites();
					this._switchWatched();
				}
			);
		this._extendEpisodesLinks();
		this._addNavigation();
		this._removeMetaLinks();
		this._removeDescription();
		this._scrollToBottom();
	}
}
