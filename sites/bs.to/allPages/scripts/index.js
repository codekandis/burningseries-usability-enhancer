'use strict';

DebugMode.enable();

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new AllPages( settings ) )
				.execute();
		}
	);
