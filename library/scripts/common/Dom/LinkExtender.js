'use strict';

class LinkExtender extends BaseClass
{
	constructor( extension )
	{
		super();

		this._extension = extension;
	}

	extend( link )
	{
		link.href = link.href + this._extension;
	}

	extendList( links )
	{
		links.forEach(
			( link ) =>
			{
				this.extend( link );
			}
		);
	}
}
