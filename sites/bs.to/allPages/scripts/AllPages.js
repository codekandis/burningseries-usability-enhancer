'use strict';

class AllPages
{
	constructor( settings )
	{
		this._settings      = settings;
		this._mouseMarker   = new MouseMarker();
		this._menuHandler   = new MenuHandler(
			[
				'#other-series-nav'
			]
		);
		this._menuReorderer = new MenuReorderer(
			[
				{
					selector:       '#other-series-nav',
					targetSelector: '#menu > li:nth-child(1)',
					position:       DomHelper.INSERT_POSITION_AFTER
				}
			]
		);
	}

	execute()
	{
		this._mouseMarker.markMouse();
		this._menuHandler.handle();
		this._menuReorderer.reorder();
	}
}
