document.addEventListener(
	'DOMContentLoaded',
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
