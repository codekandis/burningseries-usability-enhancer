'use strict';

class SorterRemover extends BaseClass
{
	#_targetSelector;

	constructor( targetSelector )
	{
		super();

		this.#_targetSelector = targetSelector;
	}

	async removeSorterAsync()
	{
		DomHelper.remove( this.#_targetSelector );
	}
}
