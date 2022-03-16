'use strict';

class ActionAdder extends BaseClass
{
	constructor( episodes, apiController, actionPosition, episodesFilter )
	{
		super();

		this._episodes       = episodes;
		this._apiController  = apiController;
		this._actionPosition = actionPosition;
		this._episodesFilter = episodesFilter;
	}

	_getSeriesDenialHandler( series )
	{
		return ( event ) =>
		{
			this
				._apiController
				.addUserSeriesDenial( series )
				.then(
					( responseData ) =>
					{
						this._episodesFilter.filter();
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
					const seriesDenialButton = DomHelper.createElementFromString( '<span>+</span>', null, 'codekandis-seriesDenialButton' );
					seriesDenialButton.addEventListener( 'click', this._getSeriesDenialHandler( series ) );
					series.container.insertAdjacentElement(
						this._actionPosition,
						seriesDenialButton
					);
				}
			);
	}
}