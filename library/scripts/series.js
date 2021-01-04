class Series
{
	constructor( seriesContainer )
	{
		this._seriesContainer = seriesContainer;
		this._seriesName      = seriesContainer
			.querySelector( 'a' )
			.text
			.trim()
			.toLowerCase();
	}

	get seriesContainer()
	{
		return this._seriesContainer;
	}

	get seriesName()
	{
		return this._seriesName;
	}

	remove()
	{
		this._seriesContainer.remove();
	}
}
