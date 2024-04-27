'use strict';

DebugMode.enable();

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new ApplicationPageDispatcher(
				settings,
				new RoutesConfiguration(),
				new AllPagesPreDispatcher( settings )
			) )
				.dispatch();
		}
	);
