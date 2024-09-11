'use strict';

class LinkExtender extends BaseClass
{
	#_episodes;
	#_subSelector;
	#_extension;

	constructor( episodes, subSelector, extension )
	{
		super();

		this.#_episodes    = episodes;
		this.#_subSelector = subSelector;
		this.#_extension   = extension;
	}

	async extendLinkAsync( link )
	{
		link.href = String.format`${ 0 }${ 1 }`( link.href, this.#_extension );
	}

	async extendLinkListAsync()
	{
		this.#_episodes
			.series
			.forEach(
				( series ) =>
				{
					this.extendLinkAsync(
						DomHelper.querySelector( 'a', series.container, false )
					);
				}
			);
	}
}
