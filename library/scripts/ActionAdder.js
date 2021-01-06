class ActionAdder
{
	constructor( episodes, apiController, actionPosition, removeIfFiltered )
	{
		this._episodes         = episodes;
		this._apiController    = apiController;
		this._actionPosition   = actionPosition;
		this._removeIfFiltered = removeIfFiltered;
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
						if ( true === this._removeIfFiltered )
						{
							this._episodes.remove( series.name );
						}
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
						this._actionPosition,
						seriesDenialButton
					);
				}
			);
	}
}
