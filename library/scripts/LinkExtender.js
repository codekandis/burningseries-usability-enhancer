'use strict';

class LinkExtender
{
	constructor( extension )
	{
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
