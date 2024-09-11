'use strict';

class Replacer extends BaseClass
{
	#_selector;
	#_replacement;

	constructor( selector, replacement )
	{
		super();

		this.#_selector    = selector;
		this.#_replacement = replacement;
	}

	async replaceAsync()
	{
		DomHelper.replaceWith(
			DomHelper.querySelector( this.#_selector ),
			this.#_replacement
		);
	}
}
