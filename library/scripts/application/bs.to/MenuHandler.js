'use strict';

class MenuHandler extends BaseClass
{
	static _currentMenuState = null;

	constructor( menuSettings )
	{
		super();

		this._menuSettings = menuSettings;
	}

	_hideMenu()
	{
		if ( null !== MenuHandler._currentMenuState )
		{
			MenuHandler._currentMenuState.isVisible             = false;
			MenuHandler._currentMenuState.subMenu.style.display = 'none';
			MenuHandler._currentMenuState.subMenu.innerHTML     = '';
			MenuHandler._currentMenuState                       = null;
		}
	}

	_showMenu( menuState )
	{
		MenuHandler._currentMenuState                       = menuState;
		MenuHandler._currentMenuState.isVisible             = true;
		MenuHandler._currentMenuState.subMenu.style.display = 'block';
		MenuHandler._currentMenuState.loader();
	}

	_addMenuStateEventHandlers()
	{
		this._menuSettings.forEach(
			( menuSetting ) =>
			{
				const menu      = DomHelper.querySelector( menuSetting.selector, document );
				const menuState = {
					menu:          menu,
					loader:        menuSetting.loader,
					menuActivator: DomHelper.querySelector(
						String.format`${ 0 } ${ 1 }`( menuSetting.selector, menuSetting.activatorSelector ),
						document
					),
					subMenu:       DomHelper.querySelector( 'ul', menu ),
					isVisible:     false
				};

				DomHelper.addEventHandler(
					menuState.menuActivator,
					'click',
					( event ) =>
					{
						event.preventDefault();
						event.stopPropagation();

						if ( true === menuState.isVisible )
						{
							this._hideMenu();

							return;
						}

						this._hideMenu();
						this._showMenu( menuState );
					}
				);
			}
		);
	}

	_addDocumentEventHandlers()
	{
		DomHelper.addEventHandler( document, 'click', this._document_click );
	}

	_addEventHandlers()
	{
		this._addMenuStateEventHandlers();
		this._addDocumentEventHandlers();
	}

	handle()
	{
		this._addEventHandlers();
	}

	_document_click = ( event ) =>
	{
		this._hideMenu();
	}
}
