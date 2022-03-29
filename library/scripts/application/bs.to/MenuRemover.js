'use strict';

class MenuRemover extends BaseClass
{
	constructor( selectors )
	{
		super();

		this._selectors = selectors;
	}

	remove()
	{
		this._selectors.forEach(
			( selector ) =>
			{
				DomHelper.remove( selector );
			}
		);
	}
}
