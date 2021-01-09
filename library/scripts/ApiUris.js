class ApiUris
{
	constructor( baseUri, userId )
	{
		this._relativeUris = {
			userSeriesDenialsFiltered: '/users/{{userId}}/series-denials/filtered'
		};

		this._baseUri = baseUri;
		this._userId  = userId;
	}

	get userSeriesDenialsFiltered()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesDenialsFiltered );
	}

	_replaceUriPlaceHolders( uri )
	{
		let replacedUri = uri;
		replacedUri     = replacedUri.replace( '{{userId}}', this._userId );

		return replacedUri;
	}
}
