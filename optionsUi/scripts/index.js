'use strict';

document.addEventListener(
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
						document.querySelector( 'form' )
					);
				}
			)
	}
);
