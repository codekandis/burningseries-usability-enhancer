'use strict';

class AllPagesApplicationPage extends AbstractApplicationPage
{
	#_menuSettings   = {
		interests: {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_INTERESTS ),
			activatorSelector: '> a',
			loader:            this.#loadInterests.bind( this )
		},
		favorites: {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_FAVORITES ),
			activatorSelector: '> a',
			loader:            this.#loadFavorites.bind( this )
		},
		watched:   {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_WATCHED ),
			activatorSelector: '> a',
			loader:            this.#loadWatched.bind( this )
		},
		denials:   {
			selector:          String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_DENIALS ),
			activatorSelector: '> a',
			loader:            this.#loadDenials.bind( this )
		}
	};
	#_mouseMarker    = new MouseMarker();
	#_headerModifier = new HeaderModifier( 'header' );
	#_footerRemover  = new FooterRemover( 'footer' );
	#_menuRemover    = new MenuRemover(
		[
			'#menu > li:nth-child( 6 ), #menu > li:nth-child( 5 ), #menu > li:nth-child( 4 ), #menu > li:nth-child( 3 )'
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
			}
		]
	);
	#_menuHandler    = new MenuHandler( this.#_menuSettings );
	#_denialsLoader;
	#_interestsLoader;
	#_favoritesLoader;
	#_watchedLoader;

	constructor( settings, applicationPageArguments )
	{
		super( settings, applicationPageArguments );

		this.#_denialsLoader   = new SeriesDenialsMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.denials.selector ),
			this._apiController
		);
		this.#_interestsLoader = new SeriesInterestsMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.interests.selector ),
			this._apiController
		);
		this.#_favoritesLoader = new SeriesFavoritesMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.favorites.selector ),
			this._apiController
		);
		this.#_watchedLoader   = new SeriesWatchedMenuLoader(
			String.format`${ 0 } ul`( this.#_menuSettings.watched.selector ),
			this._apiController
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

	async #load( loader, episodesSelector )
	{
		await loader.load();

		const episodes          = new Episodes(
			String.format`${ 0 } ul li`( episodesSelector ),
			this.#episodeNameHandler,
			this.#episodeUriHandler
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

	#loadDenials()
	{
		this.#load( this.#_denialsLoader, this.#_menuSettings.denials.selector );
	}

	#loadInterests()
	{
		this.#load( this.#_interestsLoader, this.#_menuSettings.interests.selector );
	}

	#loadFavorites()
	{
		this.#load( this.#_favoritesLoader, this.#_menuSettings.favorites.selector );
	}

	#loadWatched()
	{
		this.#load( this.#_watchedLoader, this.#_menuSettings.watched.selector );
	}

	async execute()
	{
		this.#markMouse();
		this.#modifyHeader();
		this.#removeFooter();
		this.#removeMenus();
		this.#addMenus();
		this.#handleMenus();
	}
}
