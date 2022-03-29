'use strict';

class DescriptionRemover extends BaseClass
{
	constructor( selector )
	{
		super();

		this._selector = selector;
	}

	remove()
	{
		DomHelper.remove( this._selector );
	}
}
