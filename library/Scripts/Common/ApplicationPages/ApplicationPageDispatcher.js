'use strict';

class ApplicationPageDispatcher extends BaseClass
{
	#_settings;
	#_routesConfiguration;
	#_preDispatcher;
	#_requestedUri;
	#_requestedRoute;

	constructor( settings, routesConfiguration, preDispatcher = null )
	{
		super();

		this.#_settings            = settings;
		this.#_routesConfiguration = routesConfiguration;
		this.#_preDispatcher       = preDispatcher;
		this.#_requestedUri        = new URL( document.location.href );
		this.#_requestedRoute      = this.#_requestedUri.pathname;
	}

	#decodeApplicationPageArguments( encodedApplicationPageArguments )
	{
		const decodedApplicationPageArguments = {};

		for ( const [ encodedApplicationPageArgumentIndex, encodedApplicationPageArgumentValue ] of Object.entries( encodedApplicationPageArguments ) )
		{
			decodedApplicationPageArguments[ encodedApplicationPageArgumentIndex ] = decodeURIComponent( encodedApplicationPageArgumentValue );
		}

		return decodedApplicationPageArguments;
	}

	async dispatchAsync()
	{
		if ( null !== this.#_preDispatcher )
		{
			const preDispatchmentState = new PreDispatchmentState();
			await this.#_preDispatcher.preDispatchAsync( this.#_requestedUri, preDispatchmentState );
			if ( true === preDispatchmentState.preventDispatchment )
			{
				return;
			}
		}

		const baseRoute              = this.#_routesConfiguration.baseRoute;
		let applicationPageClass     = null;
		let applicationPageArguments = {};

		this.#_routesConfiguration.routes.every(
			( configuredActionClass, configuredRoute ) =>
			{
				const requestedRouteMatches = this.#_requestedRoute.match(
					new RegExp(
						String.format`^${ 0 }${ 1 }$`( baseRoute, configuredRoute )
					)
				);

				if ( null !== requestedRouteMatches )
				{
					applicationPageClass = configuredActionClass;

					if ( undefined !== requestedRouteMatches.groups )
					{
						applicationPageArguments = this.#decodeApplicationPageArguments( requestedRouteMatches.groups );
					}

					return false;
				}
			}
		);

		if ( null !== applicationPageClass )
		{
			( new applicationPageClass( this.#_settings, applicationPageArguments ) )
				.executeAsync();
		}
	}
}
