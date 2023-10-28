'use strict';

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new LandingPageApplicationPage( settings ) )
				.execute();
		}
	);
