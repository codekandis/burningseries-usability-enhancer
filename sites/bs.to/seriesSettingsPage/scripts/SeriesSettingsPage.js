'use strict';

class SeriesSettingsPage extends BaseClass
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
		this._episodes          = new Episodes( '#usrCnt li', this._episodeNameHandler, this._episodeUriHandler );
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

	_addActions()
	{
		( new ActionAdder( this._episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, this._denialsFilter, this._denialsSwitcher, this._interestsSwitcher, this._favoritesSwitcher, this._watchedSwitcher ) )
			.addActions();
	}

	execute()
	{
		this._filterDenials()
			.then(
				() =>
				{
					this._addActions();
					this._denialsSwitcher.switch();
					this._interestsSwitcher.switch();
					this._favoritesSwitcher.switch();
					this._watchedSwitcher.switch();
				}
			);
	}
}
