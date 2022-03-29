'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new SeriesPage( settings ) )
				.execute();
		}
	);
