'use strict';

class AbstractPreDispatcher extends BaseClass
{
	#_settings;

	constructor( settings )
	{
		super();

		this.#_settings = settings;
	}

	get _settings()
	{
		return this.#_settings;
	}

	async preDispatch( requestedUri, dispatchmentState )
	{
		throw MethodIsAbstractException.with_objectAndMethod( this, this.preDispatch );
	}
}
