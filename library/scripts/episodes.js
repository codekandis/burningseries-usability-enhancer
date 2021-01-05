class Episodes
{
	constructor( episodesSelector )
	{
		this._episodesSelector = episodesSelector;
		this._series           = [];

		this._determineEpisodes();
	}

	get series()
	{
		return this._series;
	}

	_determineEpisodes()
	{
		document
			.querySelectorAll( this._episodesSelector )
			.forEach(
				( series ) =>
				{
					this._series.push( new Series( series ) );
				}
			);
	}

	remove( name )
	{
		this
			._series
			.forEach(
				( series, index ) =>
				{
					if ( series.name === name.toLowerCase() )
					{
						this._series.splice( index, 1 );
						series.remove();
					}
				}
			);
	}
}
