'use strict';

class AllPagesPreDispatcher extends AbstractPreDispatcher
{
	#_menuSettings   = {
		all:       {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_ALL ),
			activatorSelector: '> a',
			loader:            this.#loadAllAsync.bind( this ),
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
			loader:            this.#loadDenialsAsync.bind( this ),
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
			loader:            this.#loadInterestsAsync.bind( this ),
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
			loader:            this.#loadFavoritesAsync.bind( this ),
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
			loader:            this.#loadWatchedAsync.bind( this ),
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

	async #markMouseAsync()
	{
		this.#_mouseMarker.markMouseAsync();
	}

	async #modifyHeaderAsync()
	{
		this.#_headerModifier.modifyHeaderAsync();
	}

	async #removeFooterAsync()
	{
		this.#_footerRemover.removeFooterAsync();
	}

	async #removeMenusAsync()
	{
		this.#_menuRemover.removeMenuAsync();
	}

	async #addMenusAsync()
	{
		this.#_menuAdder.addMenuAsync();
	}

	async #handleMenusAsync()
	{
		this.#_menuHandler.handleMenuAsync();
	}

	async #loadAsync( loader, menuSettings )
	{
		await loader();

		const episodes          = new Episodes(
			String.format`${ 0 } ul li`( menuSettings.selector ),
			null,
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
			denialsFilter.filterSeriesDenialsAsync();
		}
		if ( true === menuSettings.filter.interests )
		{
			interestsFilter.filterSeriesInterestsAsync();
		}
		if ( true === menuSettings.filter.favorites )
		{
			favoritesFilter.filterSeriesFavoritesAsync();
		}
		if ( true === menuSettings.filter.watched )
		{
			watchedFilter.filterSeriesWatchedAsync();
		}

		denialsSwitcher.switchSeriesDenialsAsync();
		interestsSwitcher.switchSeriesInterestsAsync();
		favoritesSwitcher.switchSeriesFavoritesAsync();
		watchedSwitcher.switchSeriesWatchedAsync();

		( new ActionAdder( episodes, this.#_apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, denialsSwitcher, interestsFilter, interestsSwitcher, favoritesFilter, favoritesSwitcher, watchedFilter, watchedSwitcher ) )
			.addActionsAsync();
	}

	async #loadAllAsync()
	{
		this.#loadAsync(
			this.#_allLoader
				.loadSeriesAllAsync
				.bind( this.#_allLoader ),
			this.#_menuSettings.all
		);
	}

	async #loadDenialsAsync()
	{
		this.#loadAsync(
			this.#_denialsLoader
				.loadSeriesDenialsAsync
				.bind( this.#_denialsLoader ),
			this.#_menuSettings.denials
		);
	}

	async #loadInterestsAsync()
	{
		this.#loadAsync(
			this.#_interestsLoader
				.loadSeriesInterestsAsync
				.bind( this.#_interestsLoader ),
			this.#_menuSettings.interests
		);
	}

	async #loadFavoritesAsync()
	{
		this.#loadAsync(
			this.#_favoritesLoader
				.loadSeriesFavoritesAsync
				.bind( this.#_favoritesLoader ),
			this.#_menuSettings.favorites
		);
	}

	async #loadWatchedAsync()
	{
		this.#loadAsync(
			this.#_watchedLoader
				.loadSeriesWatchedAsync
				.bind( this.#_watchedLoader ),
			this.#_menuSettings.watched
		);
	}

	async preDispatchAsync( requestedUri, dispatchmentState )
	{
		this.#markMouseAsync();
		this.#modifyHeaderAsync();
		this.#removeFooterAsync();
		this.#removeMenusAsync();
		this.#addMenusAsync();
		this.#handleMenusAsync();
	}
}
