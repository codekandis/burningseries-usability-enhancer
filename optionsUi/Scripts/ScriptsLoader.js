'use strict';

[
	'../../library/Scripts/Common/Types/Object.js',
	'../../library/Scripts/Common/Types/Exception.js',
	'../../library/Scripts/Common/Types/InvalidStaticClassInstantiationException.js',
	'../../library/Scripts/Common/Types/StaticBaseClass.js',
	'../../library/Scripts/Common/Types/BaseClass.js',
	'../../library/Scripts/Common/Dom/Events/DocumentDomEvents.js',
	'../../library/Scripts/Common/Dom/DomInsertPositions.js',
	'../../library/Scripts/Common/Dom/DomElementNotFoundException.js',
	'../../library/Scripts/Common/Dom/DomHelper.js',
	'../../library/Scripts/Application/SettingsData.js',
	'../../library/Scripts/Application/Settings.js',
	'../Scripts/PreferencesPage.js',
	'../Scripts/index.js'
].forEach(
	( scriptUri ) =>
	{
		document.write( '<script type="text/javascript" src="' + scriptUri + '"></script>' );
	}
);
