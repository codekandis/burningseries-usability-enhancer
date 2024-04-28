'use strict';

class AllPagesPreDispatcher extends AbstractPreDispatcher
{
	#_menuSettings   = {
		all:       {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_ALL ),
			activatorSelector: '> a',
			loader:            this.#loadAll.bind( this ),
			filter:            {
				denials:   true,
				interests: true,
				favorites: true,
				watched:   true
			}
		},
		denials:   {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_DENIALS ),
			activatorSelector: '> a',
			loader:            this.#loadDenials.bind( this ),
			filter:            {
				denials:   false,
				interests: true,
				favorites: true,
				watched:   true
			}
		},
		interests: {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_INTERESTS ),
			activatorSelector: '> a',
			loader:            this.#loadInterests.bind( this ),
			filter:            {
				denials:   true,
				interests: false,
				favorites: true,
				watched:   true
			}
		},
		favorites: {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_FAVORITES ),
			activatorSelector: '> a',
			loader:            this.#loadFavorites.bind( this ),
			filter:            {
				denials:   true,
				interests: true,
				favorites: false,
				watched:   true
			}
		},
		watched:   {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_WATCHED ),
			activatorSelector: '> a',
			loader:            this.#loadWatched.bind( this ),
			filter:            {
				denials:   true,
				interests: true,
				favorites: true,
				watched:   false
			}
		}
	};
	#_mouseMarker    = new MouseMarker();
	#_headerModifier = new HeaderModifier( 'header' );
	#_footerRemover  = new FooterRemover( 'footer' );
	#_menuRemover    = new MenuRemover(
		[
			'#menu > li:nth-child( 6 ), #menu > li:nth-child( 5 ), #menu > li:nth-child( 4 ), #menu > li:nth-child( 3 ), #menu > li:nth-child( 2 )',
		]
	);
	#_menuAdder      = new MenuAdder(
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
			},
			{
				name:           'All Series',
				dataAttributes: {
					'menu-type':    MenuTypes.DROPDOWN,
					'menu-purpose': MenuPurposes.SERIES_ALL
				},
				targetSelector: '#menu > li:nth-child( 5 )',
				position:       DomInsertPositions.AFTER
			}
		]
	);
	#_menuHandler    = new MenuHandler( this.#_menuSettings );
	#_bsToController;
	#_apiController;
	#_allLoader;
	#_denialsLoader;
	#_interestsLoader;
	#_favoritesLoader;
	#_watchedLoader;

	constructor( settings )
	{
		super( settings );

		this.#_bsToController  = new BsToController();
		this.#_apiController   = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
		this.#_allLoader       = new SeriesAllMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.all.selector ),
			this.#_bsToController
		);
		this.#_denialsLoader   = new SeriesDenialsMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.denials.selector ),
			this.#_apiController
		);
		this.#_interestsLoader = new SeriesInterestsMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.interests.selector ),
			this.#_apiController
		);
		this.#_favoritesLoader = new SeriesFavoritesMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.favorites.selector ),
			this.#_apiController
		);
		this.#_watchedLoader   = new SeriesWatchedMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.watched.selector ),
			this.#_apiController
		);
	}

	get #episodeNameHandler()
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

	get #episodeUriHandler()
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

	#markMouse()
	{
		this.#_mouseMarker.markMouse();
	}

	#modifyHeader()
	{
		this.#_headerModifier.modify();
	}

	#removeFooter()
	{
		this.#_footerRemover.remove();
	}

	#removeMenus()
	{
		this.#_menuRemover.remove();
	}

	#addMenus()
	{
		this.#_menuAdder.add();
	}

	#handleMenus()
	{
		this.#_menuHandler.handle();
	}

	async #load( loader, menuSettings )
	{
		await loader.load();

		const episodes          = new Episodes(
			String.format`${ 0 } ul li`( menuSettings.selector ),
			this.#episodeNameHandler,
			this.#episodeUriHandler
		);
		const denialsFilter     = new SeriesDenialsFilter( episodes, this.#_apiController, true );
		const denialsSwitcher   = new SeriesDenialsSwitcher( episodes, this.#_apiController );
		const interestsFilter   = new SeriesInterestsFilter( episodes, this.#_apiController, true );
		const interestsSwitcher = new SeriesInterestsSwitcher( episodes, this.#_apiController );
		const favoritesFilter   = new SeriesFavoritesFilter( episodes, this.#_apiController, true );
		const favoritesSwitcher = new SeriesFavoritesSwitcher( episodes, this.#_apiController );
		const watchedFilter     = new SeriesWatchedFilter( episodes, this.#_apiController, true );
		const watchedSwitcher   = new SeriesWatchedSwitcher( episodes, this.#_apiController );

		if ( true === menuSettings.filter.denials )
		{
			denialsFilter.filter();
		}
		else
		{
			denialsSwitcher.switch();
		}
		if ( true === menuSettings.filter.interests )
		{
			interestsFilter.filter();
		}
		else
		{
			interestsSwitcher.switch();
		}
		if ( true === menuSettings.filter.favorites )
		{
			favoritesFilter.filter();
		}
		else
		{
			favoritesSwitcher.switch();
		}
		if ( true === menuSettings.filter.watched )
		{
			watchedFilter.filter();
		}
		else
		{
			watchedSwitcher.switch();
		}

		( new ActionAdder( episodes, this.#_apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, interestsFilter, interestsSwitcher, favoritesFilter, favoritesSwitcher, watchedFilter, watchedSwitcher ) )
			.addActions();
	}

	#loadAll()
	{
		this.#load( this.#_allLoader, this.#_menuSettings.all );
	}

	#loadDenials()
	{
		this.#load( this.#_denialsLoader, this.#_menuSettings.denials );
	}

	#loadInterests()
	{
		this.#load( this.#_interestsLoader, this.#_menuSettings.interests );
	}

	#loadFavorites()
	{
		this.#load( this.#_favoritesLoader, this.#_menuSettings.favorites );
	}

	#loadWatched()
	{
		this.#load( this.#_watchedLoader, this.#_menuSettings.watched );
	}

	preDispatch( requestedUri, dispatchmentState )
	{
		this.#markMouse();
		this.#modifyHeader();
		this.#removeFooter();
		this.#removeMenus();
		this.#addMenus();
		this.#handleMenus();
	}
}
