'use strict';

class AllPages extends BaseClass
{
	constructor( settings )
	{
		super();

		this._settings              = settings;
		this._apiController         = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
		this._favoritesMenuSelector = String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_FAVORITES );
		this._interestsMenuSelector = String.format`[data-menu-type='${ 0 }'][data-menu-purpose='${ 1 }']`( MenuTypes.DROPDOWN, MenuPurposes.SERIES_INTERESTS );
		this._mouseMarker           = new MouseMarker();
		this._menuRemover           = new MenuRemover(
			[
				'#menu > li:nth-child( 6 ), #menu > li:nth-child( 5 ), #menu > li:nth-child( 4 ), #menu > li:nth-child( 3 )'
			]
		);
		this._menuAdder             = new MenuAdder(
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
				}
			]
		);
		this._menuHandler           = new MenuHandler(
			[
				this._favoritesMenuSelector,
				this._interestsMenuSelector
			]
		);
		this._favoritesLoader       = new FavoritesLoader(
			String.format`${ 0 } ul`( this._favoritesMenuSelector ),
			this._apiController
		);
		this._interestsLoader       = new InterestsLoader(
			String.format`${ 0 } ul`( this._interestsMenuSelector ),
			this._apiController
		);
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
		}
	}

	get _episodeUriHandler()
	{
		return ( container ) =>
		{
			return container
				.querySelector( 'a' )
				.href;
		}
	}

	_markMouse()
	{
		this._mouseMarker.markMouse();
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

	_loadFavorites()
	{
		this._favoritesLoader
			.load()
			.then(
				( favoritesLoader ) =>
				{
					const episodes          = new Episodes(
						String.format`${ 0 } ul li`( this._favoritesMenuSelector ),
						this._episodeNameHandler,
						this._episodeUriHandler
					);
					const denialsFilter     = new DenialsFilter( episodes, this._apiController, true );
					const favoritesSwitcher = new FavoritesSwitcher( episodes, this._apiController );
					const interestsSwitcher = new InterestsSwitcher( episodes, this._apiController );

					( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, favoritesSwitcher, interestsSwitcher ) )
						.addActions();
					favoritesSwitcher.switch();
					interestsSwitcher.switch();
				}
			);
	}

	_loadInterests()
	{
		this._interestsLoader
			.load()
			.then(
				( interestsLoader ) =>
				{
					const episodes          = new Episodes(
						String.format`${ 0 } ul li`( this._interestsMenuSelector ),
						this._episodeNameHandler,
						this._episodeUriHandler
					);
					const denialsFilter     = new DenialsFilter( episodes, this._apiController, true );
					const favoritesSwitcher = new FavoritesSwitcher( episodes, this._apiController );
					const interestsSwitcher = new InterestsSwitcher( episodes, this._apiController );

					( new ActionAdder( episodes, this._apiController, DomInsertPositions.AFTER_BEGIN, denialsFilter, favoritesSwitcher, interestsSwitcher ) )
						.addActions();
					favoritesSwitcher.switch();
					interestsSwitcher.switch();
				}
			);
	}

	execute()
	{
		this._markMouse();
		this._removeMenus();
		this._addMenus();
		this._handleMenus();
		this._loadFavorites();
		this._loadInterests();
	}
}
