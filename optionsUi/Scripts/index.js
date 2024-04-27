'use strict';

DomHelper.addEventHandler(
	document,
	DocumentDomEvents.DOM_CONTENT_LOADED,
	( event ) =>
	{
		( new Settings() )
			.load()
			.then(
				( settings ) =>
				{
					new PreferencesPage(
						settings,
						DomHelper.querySelector( 'form', document )
					);
				}
			)
	}
);
