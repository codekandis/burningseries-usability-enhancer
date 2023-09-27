'use strict';

class PersistentLoginEnabler extends BaseClass
{
	constructor( selector )
	{
		super();

		this._checkboxContainer = DomHelper.querySelector( selector, null, false );
	}

	_hideCheckbox()
	{
		this._checkboxContainer.style.display = 'none';
	}

	_makeCheckboxSubmittable()
	{
		const checkbox = DomHelper.querySelector(
			'input[type="checkbox"]',
			this._checkboxContainer
		);
		checkbox.setAttribute( 'type', 'hidden' );
	}

	enable()
	{
		if ( null !== this._checkboxContainer )
		{
			this._hideCheckbox();
			this._makeCheckboxSubmittable();
		}
	}
}
