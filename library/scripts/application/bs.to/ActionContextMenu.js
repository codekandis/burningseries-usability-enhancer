'use strict';

class ActionContextMenu extends BaseClass
{
	static _contextMenu = null;

	constructor( container, series, actions )
	{
		super();

		this._container = container;
		this._series    = series;
		this._actions   = actions;
	}

	_hideMenu()
	{
		if ( null !== ActionContextMenu._contextMenu )
		{
			ActionContextMenu._contextMenu.remove();
			ActionContextMenu._contextMenu = null;
		}
	}

	_showMenu()
	{
		ActionContextMenu._contextMenu = DomHelper.createElementFromString( '<ul data-control-type="ACTION_CONTEXT_MENU"></ul>' );

		this._actions.forEach(
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

						action.action( this._series );
					}
				);

				DomHelper.appendChild( ActionContextMenu._contextMenu, subMenu );
			}
		);

		ActionContextMenu._contextMenu.style.top  = this._container.offsetTop + 'px';
		ActionContextMenu._contextMenu.style.left = this._container.offsetLeft + 'px';
		DomHelper.appendChild( this._container, ActionContextMenu._contextMenu );
	}

	hide()
	{
		this._hideMenu();
	}

	show()
	{
		this._hideMenu();
		this._showMenu();
	}
}
