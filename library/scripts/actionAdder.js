class ActionAdder
{
	constructor( episodes, apiController )
	{
		this._episodes      = episodes;
		this._apiController = apiController;
	}

	_getSeriesDenialHandler( element )
	{
		return ( event ) =>
		{
			const seriesName = element.parentElement.querySelector( 'a' ).text;
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
						this._episodes.remove( seriesName );
					}
				);
		};
	}

	addActions()
	{
		this
			._episodes
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
}
