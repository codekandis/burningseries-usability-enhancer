'use strict';

class MenuHandler extends BaseClass
{
	constructor( selectors )
	{
		super();

		this._selectors = selectors;
	}

	_addEventHandlers( selector )
	{
		const menu         = document.querySelector( selector );
		const menuSettings = {
			menu:           menu,
			subMenu:        menu.querySelector( 'ul' ),
			isRightClicked: false
		};

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
					             menuSettings.isRightClicked = true;
				             }
			             },
			mouseup:     ( event ) =>
			             {
				             event.preventDefault();

				             if ( 2 === event.button )
				             {
					             menuSettings.isRightClicked = false;
				             }
			             },
			click:       ( event ) =>
			             {
				             if (
					             ( true === menuSettings.isRightClicked && false === event.ctrlKey && false === event.altKey && false === event.shiftKey )
					             || ( false === menuSettings.isRightClicked && true === event.ctrlKey && true === event.altKey && false === event.shiftKey )
				             )
				             {
					             event.preventDefault();

					             menuSettings.subMenu.style.display = 'block' === menuSettings.subMenu.style.display ? 'none' : 'block';
				             }
			             }
		}

		DomHelper.addEventHandlers( menuSettings.menu, eventHandlerMapping );
	}

	handle()
	{
		this._selectors.forEach(
			( selector ) =>
			{
				this._addEventHandlers( selector );
			}
		);
	}
}
