'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new AllPages( settings ) )
				.execute();
		}
	);
