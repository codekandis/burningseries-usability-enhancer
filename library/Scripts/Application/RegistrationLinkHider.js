'use strict';

class RegistrationLinkHider extends BaseClass
{
	#_link;

	constructor( selector )
	{
		super();

		this.#_link = DomHelper.querySelector( selector, null, false );
	}

	async #hideLinkAsync()
	{
		this.#_link.style.display = 'none';
	}

	async hideRegistrationLinkAsync()
	{
		if ( null !== this.#_link )
		{
			this.#hideLinkAsync();
		}
	}
}
