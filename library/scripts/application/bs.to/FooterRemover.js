'use strict';

class FooterRemover extends BaseClass
{
	constructor( targetSelector )
	{
		super();

		this._targetSelector = targetSelector;
	}

	remove()
	{
		DomHelper.remove( this._targetSelector );
	}
}
