class MenuHandler
{
	constructor( selectors )
	{
		this._selectors = selectors;
		this._menus     = {};

		this._initialize();
	}

	_initialize()
	{
		this._selectors.forEach(
			( selector ) =>
			{
				const menu              = document.querySelector( selector );
				this._menus[ selector ] = {
					menu:           menu,
					subMenu:        menu.querySelector( 'ul' ),
					isRightClicked: false
				};
			}
		);
	}

	_addEventHandlers( selector )
	{
		const eventHandlerMapping = {
			contextmenu: ( event ) =>
			             {
				             event.preventDefault();
			             },
			mousedown:   ( event ) =>
			             {
				             event.preventDefault();

				             if ( 2 === event.button )
				             {
					             this._menus[ selector ].isRightClicked = true;
				             }
			             },
			mouseup:     ( event ) =>
			             {
				             event.preventDefault();

				             if ( 2 === event.button )
				             {
					             this._menus[ selector ].isRightClicked = false;
				             }
			             },
			click:       ( event ) =>
			             {
				             if (
					             ( true === this._menus[ selector ].isRightClicked && false === event.ctrlKey && false === event.altKey && false === event.shiftKey )
					             || ( false === this._menus[ selector ].isRightClicked && true === event.ctrlKey && true === event.altKey && false === event.shiftKey )
				             )
				             {
					             event.preventDefault();

					             this._menus[ selector ].subMenu.style.display = 'block' === this._menus[ selector ].subMenu.style.display ? 'none' : 'block';
				             }
			             }
		}

		DomHelper.addEventHandlers( this._menus[ selector ].menu, eventHandlerMapping );
	}

	handle()
	{
		this._menus.forEach(
			( selector, menu ) =>
			{
				this._addEventHandlers( selector );
			}
		);
	}
}
