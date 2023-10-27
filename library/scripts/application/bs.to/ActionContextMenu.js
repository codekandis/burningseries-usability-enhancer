'use strict';

class ActionContextMenu extends BaseClass
{
	static #_currentContextMenu = null;
	#_container;
	#_series;
	#_actions;

	constructor( container, series, actions )
	{
		super();

		this.#_container = container;
		this.#_series    = series;
		this.#_actions   = actions;
	}

	#hideMenu()
	{
		if ( null !== ActionContextMenu.#_currentContextMenu )
		{
			ActionContextMenu.#_currentContextMenu.remove();
			ActionContextMenu.#_currentContextMenu = null;
		}
	}

	#showMenu()
	{
		ActionContextMenu.#_currentContextMenu = DomHelper.createElementFromString( '<ul data-control-type="ACTION_CONTEXT_MENU"></ul>' );

		this.#_actions.forEach(
			( action ) =>
			{
				const subMenu = DomHelper.createElementFromString(
					String.format`<li data-control-type="ACTION_CONTEXT_MENU_ITEM" data-action-type="${ 0 }">${ 1 }</li>`( action.actionType, action.caption )
				);
				DomHelper.addEventHandler(
					subMenu,
					'click',
					( event ) =>
					{
						event.preventDefault();
						event.stopPropagation();

						action.action( this.#_series );
					}
				);

				DomHelper.appendChild( ActionContextMenu.#_currentContextMenu, subMenu );
			}
		);

		ActionContextMenu.#_currentContextMenu.style.top  = this.#_container.offsetTop + 'px';
		ActionContextMenu.#_currentContextMenu.style.left = this.#_container.offsetLeft + 'px';
		DomHelper.appendChild( this.#_container, ActionContextMenu.#_currentContextMenu );
	}

	hide()
	{
		this.#hideMenu();
	}

	show()
	{
		this.#hideMenu();
		this.#showMenu();
	}
}
