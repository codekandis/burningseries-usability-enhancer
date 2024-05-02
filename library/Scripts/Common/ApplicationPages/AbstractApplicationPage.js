'use strict';

class AbstractApplicationPage extends BaseClass
{
	#_settings;
	#_applicationPageArguments;
	#_bsToController;
	#_apiController;

	constructor( settings, applicationPageArguments )
	{
		super();

		this.#_settings                 = settings;
		this.#_applicationPageArguments = applicationPageArguments;
		this.#_bsToController           = new BsToController();
		this.#_apiController            = new ApiController(
			this._settings.get( 'apiBaseUri' ),
			this._settings.get( 'apiUserId' ),
			this._settings.get( 'apiKey' )
		);
	}

	get _settings()
	{
		return this.#_settings;
	}

	get _bsToController()
	{
		return this.#_bsToController;
	}

	get _apiController()
	{
		return this.#_apiController;
	}

	get _applicationPageArguments()
	{
		return this.#_applicationPageArguments;
	}

	async execute()
	{
		throw MethodIsAbstractException.with_objectAndMethod( this, this.execute );
	}
}
