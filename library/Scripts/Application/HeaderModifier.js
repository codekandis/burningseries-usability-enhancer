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

	#removeBanner()
	{
		DomHelper
			.querySelector( 'a.banner', this.#_header )
			.remove();
	}

	#removeGreeting()
	{
		if ( null !== this.#_navigationSection )
		{
			DomHelper
				.querySelector( 'div', this.#_navigationSection )
				.remove();
		}
	}

	#removeNavigationMenuWhitespaces()
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

	#modifyLoginForm()
	{
		( new PersistentLoginEnabler( '#login label' ) )
			.enable();
		( new RegistrationLinkHider( '#login a' ) )
			.hide();
	}

	modify()
	{
		this.#removeBanner();
		this.#removeGreeting();
		this.#removeNavigationMenuWhitespaces();
		this.#modifyLoginForm();
	}
}
