'use strict';

class AllPages extends BaseClass
{
	constructor( settings )
	{
		super();

		this._settings        = settings;
		this._apiController   = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
		this._menuSettings    = {
			interests: {
				selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_INTERESTS ),
				activatorSelector: '> a',
				loader:            this._loadInterests.bind( this )
			},
			favorites: {
				selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_FAVORITES ),
				activatorSelector: '> a',
				loader:            this._loadFavorites.bind( this )
			},
			watched:   {
				selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_WATCHED ),
				activatorSelector: '> a',
				loader:            this._loadWatched.bind( this )
			},
			denials:   {
				selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_DENIALS ),
				activatorSelector: '> a',
				loader:            this._loadDenials.bind( this )
			}
		};
		this._mouseMarker     = new MouseMarker();
		this._headerModifier  = new HeaderModifier( 'header' );
		this._footerRemover   = new FooterRemover( 'footer' );
		this._menuRemover     = new MenuRemover(
			[
				'#menu > li:nth-child( 6 ), #menu > li:nth-child( 5 ), #menu > li:nth-child( 4 ), #menu > li:nth-child( 3 )'
			]
		);
		this._menuAdder       = new MenuAdder(
			[
				{
					name:           'Favorites',
					dataAttributes: {
						'menu-type':    MenuTypes.DROPDOWN,
						'menu-purpose': MenuPurposes.SERIES_FAVORITES
					},
					targetSelector: '#menu > li:nth-child( 1 )',
					position:       DomInsertPositions.AFTER
				},
				{
					name:           'Interests',
					dataAttributes: {
						'menu-type':    MenuTypes.DROPDOWN,
						'menu-purpose': MenuPurposes.SERIES_INTERESTS
					},
					targetSelector: '#menu > li:nth-child( 2 )',
					position:       DomInsertPositions.AFTER
				},
				{
					name:           'Watched',
					dataAttributes: {
						'menu-type':    MenuTypes.DROPDOWN,
						'menu-purpose': MenuPurposes.SERIES_WATCHED
					},
					targetSelector: '#menu > li:nth-child( 3 )',
					position:       DomInsertPositions.AFTER
				},
				{
					name:           'Denials',
					dataAttributes: {
						'menu-type':    MenuTypes.DROPDOWN,
						'menu-purpose': MenuPurposes.SERIES_DENIALS
					},
					targetSelector: '#menu > li:nth-child( 4 )',
					position:       DomInsertPositions.AFTER
				}
			]
		);
		this._menuHandler     = new MenuHandler( this._menuSettings );
		this._denialsLoader   = new SeriesDenialsMenuLoader(
			String.format`${ 0 } ul`( this._menuSettings.denials.selector ),
			this._apiController
		);
		this._interestsLoader = new SeriesInterestsMenuLoader(
			String.format`${ 0 } ul`( this._menuSettings.interests.selector ),
			this._apiController
		);
		this._favoritesLoader = new SeriesFavoritesMenuLoader(
			String.format`${ 0 } ul`( this._menuSettings.favorites.selector ),
			this._apiController
		);
		this._watchedLoader   = new SeriesWatchedMenuLoader(
			String.format`${ 0 } ul`( this._menuSettings.watched.selector ),
			this._apiController
		);
	}

	get _episodeNameHandler()
	{
		return ( container ) =>
		{
			const element = DomHelper
				.querySelector( 'a', container, false );

			return null === element
				? null
				: element
					.textContent
					.trim()
					.toLowerCase();
		}
	}

	get _episodeUriHandler()
	{
		return ( container ) =>
		{
			const element = DomHelper
				.querySelector( 'a', container, false );

			return null === element
				? null
				: element
					.href;
		}
	}

	_markMouse()
	{
		this._mouseMarker.markMouse();
	}

	_modifyHeader()
	{
		this._headerModifier.modify();
	}

	_removeFooter()
	{
		this._footerRemover.remove();
	}

	_removeMenus()
	{
		this._menuRemover.remove();
	}

	_addMenus()
	{
		this._menuAdder.add();
	}

	_handleMenus()
	{
		this._menuHandler.handle();
	}

	async _load( loader, episodesSelector )
	{
		await loader.load();

		const episodes          = new Episodes(
			String.format`${ 0 } ul li`( episodesSelector ),
			this._episodeNameHandler,
			this._episodeUriHandler
		);
		const denialsFilter     = new SeriesDenialsFilter( episodes, this._apiController, true );
		const denialsSwitcher   = new SeriesDenialsSwitcher( episodes, this._apiController );
		const interestsSwitcher = new SeriesInterestsSwitcher( episodes, this._apiController );
		const favoritesSwitcher = new SeriesFavoritesSwitcher( episodes, this._apiController );
		const watchedSwitcher   = new SeriesWatchedSwitcher( episodes, this._apiController );

		( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, interestsSwitcher, favoritesSwitcher, watchedSwitcher ) )
			.addActions();

		denialsSwitcher.switch();
		interestsSwitcher.switch();
		favoritesSwitcher.switch();
		watchedSwitcher.switch();
	}

	_loadDenials()
	{
		this._load( this._denialsLoader, this._menuSettings.denials.selector );
	}

	_loadInterests()
	{
		this._load( this._interestsLoader, this._menuSettings.interests.selector );
	}

	_loadFavorites()
	{
		this._load( this._favoritesLoader, this._menuSettings.favorites.selector );
	}

	_loadWatched()
	{
		this._load( this._watchedLoader, this._menuSettings.watched.selector );
	}

	execute()
	{
		this._markMouse();
		this._modifyHeader();
		this._removeFooter();
		this._removeMenus();
		this._addMenus();
		this._handleMenus();
	}
}
