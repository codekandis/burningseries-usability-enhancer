'use strict';

class AjaxController extends BaseClass
{
	#getRequestOptions( method, headers, data = null )
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

	async getAsync( uri, headers )
	{
		return await fetch(
			uri,
			this.#getRequestOptions( HttpMethods.GET, headers )
		);
	}

	async putAsync( uri, headers, data )
	{
		return await fetch(
			uri,
			this.#getRequestOptions( HttpMethods.PUT, headers, data )
		);
	}

	async postAsync( uri, headers, data )
	{
		return await fetch(
			uri,
			this.#getRequestOptions( HttpMethods.POST, headers, data )
		);
	}

	async deleteAsync( uri, headers )
	{
		return await fetch(
			uri,
			this.#getRequestOptions( HttpMethods.DELETE, headers )
		);
	}
}
