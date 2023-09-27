'use strict';

class RegistrationLinkHider extends BaseClass
{
	constructor( selector )
	{
		super();

		this._link = DomHelper.querySelector( selector, null, false );
	}

	_hideLink()
	{
		this._link.style.display = 'none';
	}

	hide()
	{
		if ( null !== this._link )
		{
			this._hideLink();
		}
	}
}
