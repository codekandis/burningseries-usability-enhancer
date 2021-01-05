class Series
{
	constructor( container )
	{
		this._container = container;
		this._name      = container
			.querySelector( 'a' )
			.text
			.trim()
			.toLowerCase();
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
