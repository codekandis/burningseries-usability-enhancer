class Series
{
	constructor( container, nameHandler )
	{
		this._container = container;
		this._name      = nameHandler( container );
	}

	get container()
	{
		return this._container;
	}

	get name()
	{
		return this._name;
	}

	remove()
	{
		this._container.remove();
	}
}
