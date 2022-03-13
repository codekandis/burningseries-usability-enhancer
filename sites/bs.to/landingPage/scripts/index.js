'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new LandingPage( settings ) )
				.execute();
		}
	);
