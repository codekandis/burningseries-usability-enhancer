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

	#getSeriesEventHandlerMappings( series, seriesAbstract )
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

	async addSeriesAbstracts()
	{
		this
			.#_episodes
			.series
			.forEach(
				( series ) =>
				{
					const uri = series.container.querySelector( 'a' ).href;
					this.#_bsToController.readSeriesAbstract( uri )
						.then(
							( seriesAbstract ) =>
							{
								DomHelper.addEventHandlers(
									series.container,
									this.#getSeriesEventHandlerMappings( series, seriesAbstract )
								);
							}
						);
				}
			);
	}
}
