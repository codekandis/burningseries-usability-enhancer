'use strict';

DomHelper.addEventHandler(
	document,
	DocumentDomEvents.DOM_CONTENT_LOADED,
	async ( event ) =>
	{
		( new Settings() )
			.loadAsync()
			.then(
				async ( settings ) =>
				{
					new PreferencesPage(
						settings,
						DomHelper.querySelector( 'form', document )
					);
				}
			)
	}
);
