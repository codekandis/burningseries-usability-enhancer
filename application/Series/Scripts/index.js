'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new SeriesApplicationPage( settings ) )
				.execute();
		}
	);
