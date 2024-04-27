'use strict';

class RegistrationLinkHider extends BaseClass
{
	#_link;

	constructor( selector )
	{
		super();

		this.#_link = DomHelper.querySelector( selector, null, false );
	}

	#hideLink()
	{
		this.#_link.style.display = 'none';
	}

	hide()
	{
		if ( null !== this.#_link )
		{
			this.#hideLink();
		}
	}
}
