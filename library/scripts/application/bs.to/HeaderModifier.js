'use strict';

class HeaderModifier extends BaseClass
{
	constructor( targetSelector )
	{
		super();

		this._header = DomHelper.querySelector( targetSelector );
	}

	_removeBanner()
	{
		DomHelper
			.querySelector( 'a.banner', this._header )
			.remove();
	}

	modify()
	{
		this._removeBanner();
	}
}
