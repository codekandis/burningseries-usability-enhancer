console.log( 'codekandis/burningseries-latest-episodes-cleaner: sites/landingPage/scripts/index' );

( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new LandingPage( settings ) )
				.execute();
		}
	);
