'use strict';

class HeaderModifier extends BaseClass
{
	#_header;
	#_navigationSection;

	constructor( targetSelector )
	{
		super();

		this.#_header            = DomHelper.querySelector( targetSelector );
		this.#_navigationSection = DomHelper.querySelector( 'section.navigation', this.#_header, false );
	}

	async #removeBannerAsync()
	{
		DomHelper
			.querySelector( 'a.banner', this.#_header )
			.remove();
	}

	async #removeGreetingAsync()
	{
		if ( null !== this.#_navigationSection )
		{
			DomHelper
				.querySelector( 'div', this.#_navigationSection )
				.remove();
		}
	}

	async #removeNavigationMenuWhitespacesAsync()
	{
		if ( null !== this.#_navigationSection )
		{
			const whiteSpaceNodes = [];

			this.#_navigationSection
				.childNodes
				.forEach(
					( menuItem ) =>
					{
						if ( '#text' === menuItem.nodeName )
						{
							whiteSpaceNodes.push( menuItem );
						}
					}
				);

			whiteSpaceNodes.forEach(
				( whiteSpaceNode ) =>
				{
					whiteSpaceNode.remove();
				}
			);
		}
	}

	async #modifyLoginFormAsync()
	{
		( new PersistentLoginEnabler( '#login label' ) )
			.enablePersistentLoginAsync();
		( new RegistrationLinkHider( '#login a' ) )
			.hideRegistrationLinkAsync();
	}

	async modifyHeaderAsync()
	{
		this.#removeBannerAsync();
		this.#removeGreetingAsync();
		this.#removeNavigationMenuWhitespacesAsync();
		this.#modifyLoginFormAsync();
	}
}
