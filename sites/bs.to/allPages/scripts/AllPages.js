class AllPages
{
	constructor( settings )
	{
		this._settings    = settings;
		this._mouseMarker = new MouseMarker();
		this._menuHandler = new MenuHandler(
			[
				'#other-series-nav'
			]
		);
	}

	execute()
	{
		this._mouseMarker.markMouse();
		this._menuHandler.handle();
	}
}
