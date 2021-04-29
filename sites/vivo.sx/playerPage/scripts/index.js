( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new PlayerPage( settings ) )
				.execute();
		}
	);
