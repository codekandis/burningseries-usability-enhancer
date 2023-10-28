'use strict';

DebugMode.enable();

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new AllPagesApplicationPage( settings ) )
				.execute();
		}
	);
