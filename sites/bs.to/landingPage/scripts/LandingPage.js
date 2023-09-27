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
		this._denialsSwitcher   = new DenialsSwitcher( this._episodes, this._apiController );
		this._interestsSwitcher = new InterestsSwitcher( this._episodes, this._apiController );
		this._favoritesSwitcher = new FavoritesSwitcher( this._episodes, this._apiController );
		this._teaserRemover     = new TeaserRemover( '#teaser' );
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

	_filterDenials()
	{
		return this._denialsFilter.filter();
	}

	_extendEpisodesLinks()
	{
		this._linkExtender.extendList(
			DomHelper.querySelectorAll( '#newest_episodes ul li a', document )
		);
	}

	_addActions( denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher )
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher ) )
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

	execute()
	{
		this._removeTeaser();
		this._filterDenials()
			.then(
				() =>
				{
					this._extendEpisodesLinks();
					this._addActions( this._denialsFilter, this._denialsSwitcher, this._interestsSwitcher, this._favoritesSwitcher );
					this._switchDenials();
					this._switchInterests();
					this._switchFavorites();
				}
			);
	}
}
