'use strict';

class DescriptionRemover
{
	constructor( selector )
	{
		this._selector = selector;
	}

	remove()
	{
		DomHelper.remove( this._selector );
	}
}
