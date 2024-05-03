'use strict';

class LinkExtender extends BaseClass
{
	#_extension;

	constructor( extension )
	{
		super();

		this.#_extension = extension;
	}

	async extendLinkAsync( link )
	{
		link.href = link.href + this.#_extension;
	}

	async extendLinkListAsync( links )
	{
		links.forEach(
			( link ) =>
			{
				this.extendLinkAsync( link );
			}
		);
	}
}
