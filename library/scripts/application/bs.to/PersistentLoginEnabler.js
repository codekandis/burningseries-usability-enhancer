'use strict';

class PersistentLoginEnabler extends BaseClass
{
	#_checkboxContainer;

	constructor( selector )
	{
		super();

		this.#_checkboxContainer = DomHelper.querySelector( selector, null, false );
	}

	#hideCheckbox()
	{
		this.#_checkboxContainer.style.display = 'none';
	}

	#makeCheckboxSubmittable()
	{
		const checkbox = DomHelper.querySelector(
			'input[type="checkbox"]',
			this.#_checkboxContainer
		);
		checkbox.setAttribute( 'type', 'hidden' );
	}

	enable()
	{
		if ( null !== this.#_checkboxContainer )
		{
			this.#hideCheckbox();
			this.#makeCheckboxSubmittable();
		}
	}
}
