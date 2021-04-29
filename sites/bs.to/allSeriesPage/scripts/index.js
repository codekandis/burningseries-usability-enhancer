( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new AllSeriesPage( settings ) )
				.execute();
		}
	);
