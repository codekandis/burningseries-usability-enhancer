'use strict';

class NewsRemover extends BaseClass
{
	#_elementSelector;

	constructor( elementSelector )
	{
		super();

		this.#_elementSelector = elementSelector;
	}

	async removeNewsAsync()
	{
		DomHelper.remove( this.#_elementSelector );
	}
}
