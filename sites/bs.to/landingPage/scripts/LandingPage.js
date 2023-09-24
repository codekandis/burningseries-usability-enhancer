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
		this._denialsFilter     = new DenialsFilter( this._episodes, this._apiController, true );
		this._favoritesSwitcher = new FavoritesSwitcher( this._episodes, this._apiController );
		this._interestsSwitcher = new InterestsSwitcher( this._episodes, this._apiController );
	}

	get _episodeNameHandler()
	{
		return ( container ) =>
		{
			return container
				.querySelector( 'a' )
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
					container
						.querySelector( 'a' )
						.href
				)
				.groups
				.uri;

			return String.format`${ 0 }/${ 1 }`( extractedUri, this._settings.get( 'preferredLanguage' ) );
		};
	}

	_filterDenials()
	{
		return this._denialsFilter.filter();
	}

	_switchFavorites()
	{
		this._favoritesSwitcher.switch();
	}

	_switchInterests()
	{
		this._interestsSwitcher.switch();
	}

	_extendEpisodesLinks()
	{
		this._linkExtender.extendList(
			document.querySelectorAll( '#newest_episodes ul li a' )
		);
	}

	_addActions( denialsFilter, favoritesSwitcher, interestsSwitcher )
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, favoritesSwitcher, interestsSwitcher ) )
			.addActions();
	}

	execute()
	{
		this._filterDenials()
			.then(
				( denialsFilter ) =>
				{
					this._extendEpisodesLinks();
					this._addActions( denialsFilter, this._favoritesSwitcher, this._interestsSwitcher );
					this._switchFavorites();
					this._switchInterests();
				}
			);
	}
}
