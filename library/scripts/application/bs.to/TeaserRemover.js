'use strict';

class TeaserRemover extends BaseClass
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
