'use strict';

class DescriptionRemover extends BaseClass
{
	#_selector;

	constructor( selector )
	{
		super();

		this.#_selector = selector;
	}

	async removeDescriptionAsync()
	{
		DomHelper.remove( this.#_selector );
	}
}
