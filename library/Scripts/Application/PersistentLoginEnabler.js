'use strict';

class PersistentLoginEnabler extends BaseClass
{
	#_checkboxContainer;

	constructor( selector )
	{
		super();

		this.#_checkboxContainer = DomHelper.querySelector( selector, null, false );
	}

	async #hideCheckboxAsync()
	{
		this.#_checkboxContainer.style.display = 'none';
	}

	async #makeCheckboxSubmittableAsync()
	{
		const checkbox = DomHelper.querySelector(
			'input[type="checkbox"]',
			this.#_checkboxContainer
		);
		checkbox.setAttribute( 'type', 'hidden' );
	}

	async enablePersistentLoginAsync()
	{
		if ( null !== this.#_checkboxContainer )
		{
			this.#hideCheckboxAsync();
			this.#makeCheckboxSubmittableAsync();
		}
	}
}
