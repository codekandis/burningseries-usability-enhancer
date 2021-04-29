( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new SeriesSettingsPage( settings ) )
				.execute();
		}
	);
