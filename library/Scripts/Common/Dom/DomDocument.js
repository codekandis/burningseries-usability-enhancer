'use strict';

class DomDocument extends StaticBaseClass
{
	static async loadAsync( handler )
	{
		DomHelper.addEventHandler(
			document,
			DocumentDomEvents.DOM_CONTENT_LOADED,
			handler
		);
	}
}
