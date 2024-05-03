'use strict';

class BaseSeriesMenuLoader extends BaseClass
{
	#_selector;
	#_menuContainer = null;

	constructor( selector )
	{
		super();

		this.#_selector = selector;
	}

	async #appendMenuFilterAsync()
	{
		const menuFilterItem = DomHelper.createElementFromString( '<li><input data-control-type="MENU_FILTER" type="text" placeholder="Filter"/></li>' );
		const menuFilter     = DomHelper.querySelector( '[data-control-type="MENU_FILTER"]', menuFilterItem );
		( new MenuFilterProvider( menuFilter, this.#_menuContainer ) )
			.appendAsync();

		DomHelper.appendChild( this.#_menuContainer, menuFilterItem );

		menuFilter.focus();
	}

	async #appendMenuItemsAsync( series )
	{
		const menuItems = DomHelper.createElementsFromString(
			series
				.sort(
					( series_1, series_2 ) =>
					{
						if ( series_1.name < series_2.name )
						{
							return -1;
						}
						if ( series_1.name > series_2.name )
						{
							return 1;
						}

						return 0;
					}
				)
				.map(
					( series ) =>
					{
						return String.format`<li><a href="${ 0 }">${ 1 }</a></li>`( series.uri, series.name )
					}
				)
				.join( '' )
		);

		DomHelper.appendChildren( this.#_menuContainer, [ ...menuItems ] );
	}

	async _addSeriesAsync( series )
	{
		this.#_menuContainer = DomHelper.querySelector( this.#_selector );
		this.#appendMenuFilterAsync();
		this.#appendMenuItemsAsync( series );
	}
}
