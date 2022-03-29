'use strict';

class AjaxController extends BaseClass
{
	_getRequestOptions( method, headers, data = null )
	{
		const requestOptions = {
			method:  method,
			headers: {}
		};

		headers.forEach(
			( value, name ) =>
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
			this._getRequestOptions( HttpMethods.GET, headers )
		);
	}

	async put( uri, headers, data )
	{
		return await fetch(
			uri,
			this._getRequestOptions( HttpMethods.PUT, headers, data )
		);
	}

	async post( uri, headers, data )
	{
		return await fetch(
			uri,
			this._getRequestOptions( HttpMethods.POST, headers, data )
		);
	}

	async delete( uri, headers )
	{
		return await fetch(
			uri,
			this._getRequestOptions( HttpMethods.DELETE, headers )
		);
	}
}
