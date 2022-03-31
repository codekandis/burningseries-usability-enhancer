'use strict';

class MenuHandler extends BaseClass
{
	constructor( selectors )
	{
		super();

		this._selectors  = selectors;
		this._menuStates = [];
	}

	_addEventHandlers( selector )
	{
		const menu      = document.querySelector( selector );
		const menuState = {
			menu:           menu,
			subMenu:        menu.querySelector( 'ul' ),
			isRightClicked: false,
			isVisible:      false
		};
		this._menuStates.push( menuState );

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
					             menuState.isRightClicked = true;
				             }
			             },
			mouseup:     ( event ) =>
			             {
				             event.preventDefault();

				             if ( 2 === event.button )
				             {
					             menuState.isRightClicked = false;
				             }
			             },
			click:       ( event ) =>
			             {
				             if (
					             ( true === menuState.isRightClicked && false === event.ctrlKey && false === event.altKey && false === event.shiftKey )
					             || ( false === menuState.isRightClicked && true === event.ctrlKey && true === event.altKey && false === event.shiftKey )
				             )
				             {
					             event.preventDefault();

					             if ( false === menuState.isVisible )
					             {
						             this._menuStates.forEach(
							             ( menuStateFetched ) =>
							             {
								             if ( true === menuStateFetched.isVisible )
								             {
									             menuStateFetched.isVisible             = false;
									             menuStateFetched.subMenu.style.display = 'none';
								             }
							             }
						             );

						             menuState.isVisible             = true;
						             menuState.subMenu.style.display = 'block';

						             return;
					             }

					             menuState.isVisible             = false;
					             menuState.subMenu.style.display = 'none';
				             }
			             }
		}

		DomHelper.addEventHandlers( menuState.menu, eventHandlerMapping );
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
