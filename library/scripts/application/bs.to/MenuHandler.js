'use strict';

class MenuHandler extends BaseClass
{
	constructor( menuSettings )
	{
		super();

		this._menuSettings = menuSettings;
		this._menuStates   = [];
	}

	_addEventHandlers( menuSetting )
	{
		const menu      = DomHelper.querySelector( menuSetting.selector, document );
		const menuState = {
			menu:          menu,
			menuActivator: DomHelper.querySelector(
				String.format`${ 0 } ${ 1 }`( menuSetting.selector, menuSetting.activatorSelector ),
				document
			),
			subMenu:       DomHelper.querySelector( 'ul', menu ),
			isVisible:     false
		};
		this._menuStates.push( menuState );

		DomHelper.addEventHandler(
			menuState.menuActivator,
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
		this._menuSettings.forEach(
			( menuSetting ) =>
			{
				this._addEventHandlers( menuSetting );
			}
		);
	}
}
