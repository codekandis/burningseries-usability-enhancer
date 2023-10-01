'use strict';

class AllSeriesPage extends BaseClass
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
		this._episodes          = new Episodes( '#seriesContainer ul li', this._episodeNameHandler, this._episodeUriHandler );
		this._denialsFilter     = new DenialsFilter( this._episodes, this._apiController, true );
		this._denialsSwitcher   = new DenialsSwitcher( this._episodes, this._apiController );
		this._interestsSwitcher = new InterestsSwitcher( this._episodes, this._apiController );
		this._favoritesSwitcher = new FavoritesSwitcher( this._episodes, this._apiController );
		this._watchedSwitcher   = new WatchedSwitcher( this._episodes, this._apiController );
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
		}
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

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this._denialsFilter, this._denialsSwitcher, this._interestsSwitcher, this._favoritesSwitcher, this._watchedSwitcher ) )
			.addActions();
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
	}
}
