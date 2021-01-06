class Episodes
{
	constructor( selector, nameHandler )
	{
		this._selector    = selector;
		this._nameHandler = nameHandler;
		this._series      = [];

		this._determineEpisodes();
	}

	get series()
	{
		return this._series;
	}

	_determineEpisodes()
	{
		document
			.querySelectorAll( this._selector )
			.forEach(
				( series ) =>
				{
					this._series.push( new Series( series, this._nameHandler ) );
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
