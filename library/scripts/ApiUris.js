class ApiUris
{
	constructor( baseUri, userId )
	{
		this._relativeUris = {
			userSeriesDenials: '/users/{{userId}}/series-denials'
		};

		this._baseUri = baseUri;
		this._userId  = userId;
	}

	get userSeriesDenials()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesDenials );
	}

	_replaceUriPlaceHolders( uri )
	{
		let replacedUri = uri;
		replacedUri     = replacedUri.replace( '{{userId}}', this._userId );

		return replacedUri;
	}
}
