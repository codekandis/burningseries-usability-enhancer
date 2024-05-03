'use strict';

class SeriesTitleAttributeRemover extends BaseClass
{
	#_episodes;

	constructor( episodes )
	{
		super();

		this.#_episodes = episodes;
	}

	async removeTitleAttributesAsync()
	{
		this
			.#_episodes
			.series
			.forEach(
				( series ) =>
				{
					series
						.container
						.querySelectorAll( '[title]' )
						.forEach(
							( element ) =>
							{
								element.removeAttribute( 'title' );
							}
						)
				}
			);
	}
}
