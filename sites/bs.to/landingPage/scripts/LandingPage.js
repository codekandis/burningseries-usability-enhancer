'use strict';

class LandingPage extends BaseClass
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
		this._episodes          = new Episodes( '#newest_episodes ul li, #newest_series ul li', this._episodeNameHandler, this._episodeUriHandler );
		this._denialsFilter     = new SeriesDenialsFilter( this._episodes, this._apiController, true );
		this._denialsSwitcher   = new SeriesDenialsSwitcher( this._episodes, this._apiController );
		this._interestsSwitcher = new SeriesInterestsSwitcher( this._episodes, this._apiController );
		this._favoritesSwitcher = new SeriesFavoritesSwitcher( this._episodes, this._apiController );
		this._watchedSwitcher   = new SeriesWatchedSwitcher( this._episodes, this._apiController );
		this._teaserRemover     = new TeaserRemover( '#teaser' );
		this._headLineRemover   = new HeadLineRemover( '.home > h2' );
	}

	get _episodeNameHandler()
	{
		return ( container ) =>
		{
			return DomHelper
				.querySelector( 'a', container )
				.textContent
				.trim()
				.toLowerCase();
		};
	}

	get _episodeUriHandler()
	{
		return ( container ) =>
		{
			const extractedUri = /^.+?\/.+?\/(?<uri>serie\/.+?)(?:\/.+)?$/
				.exec(
					DomHelper
						.querySelector( 'a', container )
						.href
				)
				.groups
				.uri;

			return String.format`${ 0 }/${ 1 }`( extractedUri, this._settings.get( 'preferredLanguage' ) );
		};
	}

	_removeTeaser()
	{
		this._teaserRemover.remove();
	}

	_removeHeadLine()
	{
		this._headLineRemover.remove();
	}

	_filterDenials()
	{
		return this._denialsFilter.filter();
	}

	_extendEpisodesLinks()
	{
		this._linkExtender.extendList(
			DomHelper.querySelectorAll( '#newest_episodes ul li a', document, false )
		);
	}

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this._denialsFilter, this._denialsSwitcher, this._interestsSwitcher, this._favoritesSwitcher, this._watchedSwitcher ) )
			.addActions();
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

	execute()
	{
		this._removeTeaser();
		this._removeHeadLine();
		this._filterDenials()
			.then(
				() =>
				{
					this._extendEpisodesLinks();
					this._addActions();
					this._switchDenials();
					this._switchInterests();
					this._switchFavorites();
					this._switchWatched();
				}
			);
	}
}
