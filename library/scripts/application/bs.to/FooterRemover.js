'use strict';

class FooterRemover extends BaseClass
{
	#_targetSelector;

	constructor( targetSelector )
	{
		super();

		this.#_targetSelector = targetSelector;
	}

	remove()
	{
		DomHelper.remove( this.#_targetSelector );
	}
}
