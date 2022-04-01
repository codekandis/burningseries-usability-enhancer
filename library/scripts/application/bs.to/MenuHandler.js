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
			menu:      menu,
			subMenu:   menu.querySelector( 'ul' ),
			isVisible: false
		};
		this._menuStates.push( menuState );

		DomHelper.addEventHandler( menuState.menu,
			'click',
			( event ) =>
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
		);
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
