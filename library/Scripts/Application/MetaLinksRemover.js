'use strict';

class MetaLinksRemover extends BaseClass
{
	#_targetSelector;

	constructor( targetSelector )
	{
		super();

		this.#_targetSelector = targetSelector;
	}

	async removeMetaLinksAsync()
	{
		DomHelper.remove( this.#_targetSelector );
	}
}
