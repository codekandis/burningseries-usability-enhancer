class PlayerPage
{
	constructor( settings )
	{
		this._settings        = settings;
		this._mouseMarker     = new MouseMarker();
		this._playerActivator = new PlayerActivator();
	}

	_addMouseMarker()
	{
		this._mouseMarker.markMouse();
	}

	_activatePlayer()
	{
		this._playerActivator.activate();
	}

	execute()
	{
		this._addMouseMarker();
		this._activatePlayer();
	}
}
