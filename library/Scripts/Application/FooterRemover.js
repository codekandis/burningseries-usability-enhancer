'use strict';

class FooterRemover extends BaseClass
{
	#_targetSelector;

	constructor( targetSelector )
	{
		super();

		this.#_targetSelector = targetSelector;
	}

	async removeFooterAsync()
	{
		DomHelper.remove( this.#_targetSelector );
	}
}
