'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new SeriesSettingsApplicationPage( settings ) )
				.execute();
		}
	);
