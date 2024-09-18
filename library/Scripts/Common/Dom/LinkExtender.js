'use strict';

class LinkExtender extends BaseClass
{
	#_extension;

	constructor( extension )
	{
		super();

		this.#_extension = extension;
	}

	async extendHrefAsync( href )
	{
		return href + this.#_extension;
	}

	async extendHrefListAsync( hrefs )
	{
		hrefs.forEach(
			async ( href ) =>
			{
				await this.extendHrefAsync( href );
			}
		);

		return hrefs;
	}

	async extendLinkAsync( link )
	{
		link.href = link.href + this.#_extension;

		return link;
	}

	async extendLinkListAsync( links )
	{
		links.forEach(
			async ( link ) =>
			{
				await this.extendLinkAsync( link );
			}
		);

		return links;
	}
}
