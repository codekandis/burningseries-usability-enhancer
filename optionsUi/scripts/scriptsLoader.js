[
	'../../library/scripts/Object.js',
	'../../library/scripts/DomHelper.js',
	'../../library/scripts/SettingsData.js',
	'../../library/scripts/Settings.js',
	'../scripts/PreferencesPage.js',
	'../scripts/index.js'
].forEach(
	( scriptUri ) =>
	{
		document.write( '<script type="text/javascript" src="' + scriptUri + '"></script>' );
	}
);
