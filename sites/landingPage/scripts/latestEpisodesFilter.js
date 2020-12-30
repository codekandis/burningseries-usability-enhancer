console.log( 'codekandis/burningseries-latest-episodes-cleaner: sites/landingPage/scripts/latestEpisodesFilter' );

class LatestEpisodesFilter
{
	constructor( latestEpisodes, apiController )
	{
		this._latestEpisodes = latestEpisodes;
		this._apiController  = apiController;

		this._addActions();
	}

	_addActions()
	{
		this
			._latestEpisodes
			.series
			.forEach(
				( series ) =>
				{
					const seriesDenialButton = DomHelper.createElementFromString( '<span class="codekandis-seriesDenialButton">+</span>' );
					seriesDenialButton.addEventListener( 'click', this._getSeriesDenialHandler( seriesDenialButton ) );
					series.seriesContainer.insertAdjacentElement(
						'beforeend',
						seriesDenialButton
					);
				}
			);
	}

	_getSeriesDenialHandler( element )
	{
		return ( event ) =>
		{
			const seriesName = element.parentElement.querySelector( 'a' ).text;
			console.log( seriesName );
			this
				._apiController
				.addUserSeriesDenial(
					{
						seriesDenial:
							{
								name: seriesName
							}
					}
				)
				.then(
					( responseData ) =>
					{
						this._latestEpisodes.remove( seriesName );
					}
				);
		};
	}

	filter()
	{
		this._apiController
			.readUserSeriesDenials()
			.then(
				( responseData ) =>
				{
					responseData
						.data
						.seriesDenials
						.forEach(
							( series ) =>
							{
								this._latestEpisodes.remove( series.name );
							}
						)
				}
			);
	}
}
