'use strict';

DebugMode.enable();

( new Settings() )
	.loadAsync()
	.then(
		async ( settings ) =>
		{
			( new ApplicationPageDispatcher(
				settings,
				new RoutesConfiguration(),
				new AllPagesPreDispatcher( settings )
			) )
				.dispatchAsync();
		}
	);
