'use strict';

class AbstractRoutesConfiguration extends BaseClass
{
	__baseRoute = '';
	__routes    = {};

	get baseRoute()
	{
		return this.__baseRoute;
	}

	get routes()
	{
		return this.__routes;
	}
}
