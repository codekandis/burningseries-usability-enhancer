'use strict';

class SeriesAbstractsAdder extends BaseClass
{
	#_episodes;
	#_bsToController;

	constructor( episodes, bsToController )
	{
		super();

		this.#_episodes       = episodes;
		this.#_bsToController = bsToController;
	}

	async #getSeriesEventHandlerMappingsAsync( series, seriesAbstract )
	{
		return {
			mouseenter: ( event ) =>
			            {
				            DomHelper.appendChild(
					            series.container,
					            DomHelper.createElementFromString(
						            String.format`<div data-control-type="SERIES_ABSTRACT"><img src="${ 0 }" /><div>${ 1 }</div></div>`( seriesAbstract.image, seriesAbstract.description )
					            )
				            );
			            },
			mouseleave: ( event ) =>
			            {
				            DomHelper
					            .querySelector( '[data-control-type="SERIES_ABSTRACT"]', series.container, false )
					            ?.remove();
			            }
		};
	}

	async addSeriesAbstractsAsync()
	{
		this
			.#_episodes
			.series
			.forEach(
				( series ) =>
				{
					const uri = series.container.querySelector( 'a' ).href;
					this.#_bsToController.readSeriesAbstractAsync( uri )
						.then(
							async ( seriesAbstract ) =>
							{
								DomHelper.addEventHandlers(
									series.container,
									await this.#getSeriesEventHandlerMappingsAsync( series, seriesAbstract )
								);
							}
						);
				}
			);
	}
}
