console.log( 'codekandis/burningseries-latest-episodes-cleaner: sites/landingPage/scripts/latestEpisodes' );

class LatestEpisodes
{
	constructor()
	{
		this._originLatestEpisodesContainerSelector = '#newest_episodes ul';
		this._series                                = [];

		this._determineLatestEpisodes();
	}

	get series()
	{
		return this._series;
	}

	_determineLatestEpisodes()
	{
		document
			.querySelector( this._originLatestEpisodesContainerSelector )
			.querySelectorAll( 'li' )
			.forEach(
				( series ) =>
				{
					this._series.push( new Series( series ) );
				}
			);
	}

	remove( seriesName )
	{
		this
			._series
			.forEach(
				( series, index ) =>
				{
					if ( series.seriesName === seriesName.toLowerCase() )
					{
						this._series.splice( index, 1 );
						series.remove();
					}
				}
			);
	}
}
