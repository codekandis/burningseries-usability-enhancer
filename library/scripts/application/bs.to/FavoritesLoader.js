'use strict';

class FavoritesLoader extends BaseClass
{
	constructor( selector, apiController )
	{
		super();

		this._selector      = selector;
		this._apiController = apiController;
	}

	async load()
	{
		const container = DomHelper.querySelector( this._selector );

		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._apiController
					.readUserSeriesFavorites()
					.then(
						( responseData ) =>
						{
							container.replaceChildren();

							responseData
								.data
								.seriesFavorites
								.sort(
									( series_1, series_2 ) =>
									{
										if ( series_1.name < series_2.name )
										{
											return -1;
										}
										if ( series_1.name > series_2.name )
										{
											return 1;
										}
										return 0;
									}
								)
								.forEach(
									( series ) =>
									{
										DomHelper.appendChild(
											container,
											DomHelper.createElementFromString(
												String.format`<li><a href="${ 0 }">${ 1 }</a></li>`( series.uri, series.name )
											)
										);
									}
								);
							resolveHandler( this );
						}
					);
			}
		);
	}
}
