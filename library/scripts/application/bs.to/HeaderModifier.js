'use strict';

class HeaderModifier extends BaseClass
{
	constructor( targetSelector )
	{
		super();

		this._header            = DomHelper.querySelector( targetSelector );
		this._navigationSection = DomHelper.querySelector( 'section.navigation', this._header, false );
	}

	_removeBanner()
	{
		DomHelper
			.querySelector( 'a.banner', this._header )
			.remove();
	}

	_removeGreeting()
	{
		if ( null !== this._navigationSection )
		{
			DomHelper
				.querySelector( 'div', this._navigationSection )
				.remove();
		}
	}

	_removeNavigationMenuWhitespaces()
	{
		if ( null !== this._navigationSection )
		{
			const whiteSpaceNodes = [];

			this._navigationSection
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

	_modifyLoginForm()
	{
		( new PersistentLoginEnabler( 'header > #login label' ) )
			.enable();
	}

	modify()
	{
		this._removeBanner();
		this._removeGreeting();
		this._removeNavigationMenuWhitespaces();
		this._modifyLoginForm();
	}
}
