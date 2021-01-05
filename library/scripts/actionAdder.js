class ActionAdder
{
	constructor( episodes, apiController )
	{
		this._episodes      = episodes;
		this._apiController = apiController;
	}

	_getSeriesDenialHandler( series )
	{
		return ( event ) =>
		{
			this
				._apiController
				.addUserSeriesDenial(
					{
						seriesDenial:
							{
								name: series.name
							}
					}
				)
				.then(
					( responseData ) =>
					{
						this._episodes.remove( series.name );
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
					seriesDenialButton.addEventListener( 'click', this._getSeriesDenialHandler( series ) );
					series.container.insertAdjacentElement(
						'beforeend',
						seriesDenialButton
					);
				}
			);
	}
}
