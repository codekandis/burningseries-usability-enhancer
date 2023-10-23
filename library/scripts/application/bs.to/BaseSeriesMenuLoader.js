'use strict';

class BaseSeriesMenuLoader extends BaseClass
{
	constructor( selector )
	{
		super();

		this._selector      = selector;
		this._menuContainer = null;
	}

	_appendMenuFilter()
	{
		const menuFilterItem = DomHelper.createElementFromString( '<li><input data-control-type="MENU_FILTER" type="text" placeholder="Filter"/></li>' );
		const menuFilter     = DomHelper.querySelector( '[data-control-type="MENU_FILTER"]', menuFilterItem );
		( new MenuFilterProvider( menuFilter, this._menuContainer ) )
			.append();

		DomHelper.appendChild( this._menuContainer, menuFilterItem );

		menuFilter.focus();
	}

	_appendMenuItems( series )
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

		DomHelper.appendChildren( this._menuContainer, [ ...menuItems ] );
	}

	_addSeries( series )
	{
		this._menuContainer = DomHelper.querySelector( this._selector );
		this._appendMenuFilter();
		this._appendMenuItems( series );
	}
}
