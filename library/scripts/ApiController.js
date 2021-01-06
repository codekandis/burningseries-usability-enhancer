class ApiController
{
	constructor( apiBaseUri, apiUserId, apiKey )
	{
		this._apiBaseUri     = apiBaseUri;
		this._apiUserId      = apiUserId;
		this._apiKey         = apiKey;
		this._apiUris        = new ApiUris( apiBaseUri, apiUserId );
		this._ajaxController = new AjaxController();
	}

	_getHeaders()
	{
		return {
			Authorization:  'Key ' + this._apiKey,
			'Content-Type': 'application/json; charset=utf-8'
		};
	}

	async readUserSeriesDenials()
	{
		return (
			await this._ajaxController.get(
				this._apiUris.userSeriesDenials,
				this._getHeaders()
			)
		).json();
	}

	async addUserSeriesDenial( data )
	{
		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesDenials,
				this._getHeaders(),
				JSON.stringify( data )
			)
		).json();
	}
}
