'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new AllSeriesApplicationPage( settings ) )
				.execute();
		}
	);
