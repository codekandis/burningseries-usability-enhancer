'use strict';

class MenuRemover extends BaseClass
{
	#_selectors;

	constructor( selectors )
	{
		super();

		this.#_selectors = selectors;
	}

	async removeMenuAsync()
	{
		this.#_selectors.forEach(
			( selector ) =>
			{
				DomHelper.remove( selector );
			}
		);
	}
}
