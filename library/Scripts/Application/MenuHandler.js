'use strict';

class MenuHandler extends BaseClass
{
	static #_currentMenuState = null;
	#_menuSettings;

	constructor( menuSettings )
	{
		super();

		this.#_menuSettings = menuSettings;
	}

	async #hideMenuAsync()
	{
		if ( null !== MenuHandler.#_currentMenuState )
		{
			MenuHandler.#_currentMenuState.isVisible             = false;
			MenuHandler.#_currentMenuState.subMenu.style.display = 'none';
			MenuHandler.#_currentMenuState.subMenu.innerHTML     = '';
			MenuHandler.#_currentMenuState                       = null;
		}
	}

	async #showMenuAsync( menuState )
	{
		MenuHandler.#_currentMenuState                       = menuState;
		MenuHandler.#_currentMenuState.isVisible             = true;
		MenuHandler.#_currentMenuState.subMenu.style.display = null;
		MenuHandler.#_currentMenuState.loader();
	}

	async #addMenuStateEventHandlersAsync()
	{
		this.#_menuSettings.forEach(
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
							this.#hideMenuAsync();

							return;
						}

						this.#hideMenuAsync();
						this.#showMenuAsync( menuState );
					}
				);
			}
		);
	}

	async #addDocumentEventHandlersAsync()
	{
		DomHelper.addEventHandler( document, 'click', this.#document_click );
	}

	async #addEventHandlersAsync()
	{
		this.#addMenuStateEventHandlersAsync();
		this.#addDocumentEventHandlersAsync();
	}

	#document_click = ( event ) =>
	{
		this.#hideMenuAsync();
	}

	async handleMenuAsync()
	{
		this.#addEventHandlersAsync();
	}
}
