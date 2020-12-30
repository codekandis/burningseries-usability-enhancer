console.log( 'codekandis/burningseries-latest-episodes-cleaner: sites/landingPage/scripts/series' );

class Series
{
	constructor( seriesContainer )
	{
		this._seriesContainer = seriesContainer;
		this._seriesName      = seriesContainer
			.querySelector( 'a' )
			.text
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
