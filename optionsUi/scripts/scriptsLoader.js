[
	'../../library/scripts/object.js',
	'../../library/scripts/settings.js',
	'../scripts/preferencesPage.js',
	'../scripts/index.js'
].forEach(
	( scriptUri ) =>
	{
		document.write( '<script type="text/javascript" src="' + scriptUri + '"></script>' );
	}
);
