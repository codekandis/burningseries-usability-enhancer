class AjaxController
{
	constructor()
	{
		this._methods = {
			get:    'GET',
			put:    'PUT',
			post:   'POST',
			delete: 'DELETE'
		};
	}

	_getRequestOptions( method, headers, data = null )
	{
		const requestOptions = {
			method:  method,
			headers: {}
		};

		headers.forEach(
			( name, value ) =>
			{
				requestOptions.headers[ name ] = value;
			}
		);

		if ( null !== data )
		{
			requestOptions.body = data;
		}

		return requestOptions;
	}

	async get( uri, headers )
	{
		return await fetch(
			uri,
			this._getRequestOptions( this._methods.get, headers )
		);
	}

	async put( uri, headers, data )
	{
		return await fetch(
			uri,
			this._getRequestOptions( this._methods.put, headers, data )
		);
	}

	async post( uri, headers, data )
	{
		return await fetch(
			uri,
			this._getRequestOptions( this._methods.post, headers, data )
		);
	}

	async delete( uri, headers )
	{
		return await fetch(
			uri,
			this._getRequestOptions( this._methods.delete, headers )
		);
	}
}
