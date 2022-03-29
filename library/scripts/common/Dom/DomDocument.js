'use strict';

class DomDocument extends StaticBaseClass
{
	static load( handler )
	{
		DomHelper.addEventHandler(
			document,
			DocumentDomEvents.DOM_CONTENT_LOADED,
			handler
		);
	}
}
