class AllPages
{
	constructor( settings )
	{
		this._settings    = settings;
		this._menuHandler = new MenuHandler( '#other-series-nav' );
	}

	execute()
	{
		this._menuHandler.handle();
	}
}
