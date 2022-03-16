'use strict';

[
	'../../library/scripts/common/Types/Object.js',
	'../../library/scripts/common/Types/Exception.js',
	'../../library/scripts/common/Types/InvalidStaticClassInstantiationException.js',
	'../../library/scripts/common/Types/StaticBaseClass.js',
	'../../library/scripts/common/Types/BaseClass.js',
	'../../library/scripts/common/Dom/Events/DocumentDomEvents.js',
	'../../library/scripts/common/Dom/DomInsertPositions.js',
	'../../library/scripts/common/Dom/DomElementNotFoundException.js',
	'../../library/scripts/common/Dom/DomHelper.js',
	'../../library/scripts/application/SettingsData.js',
	'../../library/scripts/application/Settings.js',
	'../scripts/PreferencesPage.js',
	'../scripts/index.js'
].forEach(
	( scriptUri ) =>
	{
		document.write( '<script type="text/javascript" src="' + scriptUri + '"></script>' );
	}
);
