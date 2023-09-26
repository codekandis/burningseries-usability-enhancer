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

	get( uri, headers )
	{
		return fetch(
			uri,
			this._getRequestOptions( HttpMethods.GET, headers )
		);
	}

	put( uri, headers, data )
	{
		return fetch(
			uri,
			this._getRequestOptions( HttpMethods.PUT, headers, data )
		);
	}

	post( uri, headers, data )
	{
		return fetch(
			uri,
			this._getRequestOptions( HttpMethods.POST, headers, data )
		);
	}

	delete( uri, headers )
	{
		return fetch(
			uri,
			this._getRequestOptions( HttpMethods.DELETE, headers )
		);
	}
}
