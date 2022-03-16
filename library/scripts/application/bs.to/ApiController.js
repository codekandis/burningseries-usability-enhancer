'use strict';

class ApiController extends BaseClass
{
	constructor( apiBaseUri, apiUserId, apiKey )
	{
		super();

		this._apiBaseUri     = apiBaseUri;
		this._apiUserId      = apiUserId;
		this._apiKey         = apiKey;
		this._apiUris        = new ApiUris( this._apiBaseUri, this._apiUserId );
		this._ajaxController = new AjaxController();
	}

	_getHeaders()
	{
		return {
			Authorization:  'Key ' + this._apiKey,
			'Content-Type': 'application/json; charset=utf-8'
		};
	}

	_createJsonData( data )
	{
		return JSON.stringify( data );
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

	async readUserSeriesDenialsFiltered( series )
	{
		const requestData = this._createJsonData(
			{
				series: series
					        .map(
						        ( seriesFetched ) =>
						        {
							        return {
								        name: seriesFetched.name
							        }
						        }
					        )
			}
		);

		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesDenialsFiltered,
				this._getHeaders(),
				requestData
			)
		).json();
	}

	async addUserSeriesDenial( series )
	{
		const requestData = this._createJsonData(
			{
				seriesDenial:
					{
						name: series.name
					}
			}
		);

		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesDenials,
				this._getHeaders(),
				requestData
			)
		).json();
	}

	async deleteUserSeriesDenial( series )
	{
		return (
			await this._ajaxController.delete(
				this._apiUris.userSeriesDenials + '/' + series.id,
				this._getHeaders()
			)
		).json();
	}

	async readUserSeriesFavorites()
	{
		return (
			await this._ajaxController.get(
				this._apiUris.userSeriesFavorites,
				this._getHeaders()
			)
		).json();
	}

	async readUserSeriesFavoritesFiltered( series )
	{
		const requestData = this._createJsonData(
			{
				series: series
					        .map(
						        ( seriesFetched ) =>
						        {
							        return {
								        name: seriesFetched.name
							        }
						        }
					        )
			}
		);

		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesFavoritesFiltered,
				this._getHeaders(),
				requestData
			)
		).json();
	}

	async addUserSeriesFavorite( series )
	{
		const requestData = this._createJsonData(
			{
				seriesFavorite:
					{
						name: series.name
					}
			}
		);

		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesFavorites,
				this._getHeaders(),
				requestData
			)
		).json();
	}

	async deleteUserSeriesFavorite( series )
	{
		return (
			await this._ajaxController.delete(
				this._apiUris.userSeriesFavorites + '/' + series.id,
				this._getHeaders()
			)
		).json();
	}

	async readUserSeriesInterests()
	{
		return (
			await this._ajaxController.get(
				this._apiUris.userSeriesInterests,
				this._getHeaders()
			)
		).json();
	}

	async readUserSeriesInterestsFiltered( series )
	{
		const requestData = this._createJsonData(
			{
				series: series
					        .map(
						        ( seriesFetched ) =>
						        {
							        return {
								        name: seriesFetched.name
							        }
						        }
					        )
			}
		);

		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesInterestsFiltered,
				this._getHeaders(),
				requestData
			)
		).json();
	}

	async addUserSeriesInterest( series )
	{
		const requestData = this._createJsonData(
			{
				seriesInterest:
					{
						name: series.name
					}
			}
		);

		return (
			await this._ajaxController.put(
				this._apiUris.userSeriesInterests,
				this._getHeaders(),
				requestData
			)
		).json();
	}

	async deleteUserSeriesInterest( series )
	{
		return (
			await this._ajaxController.delete(
				this._apiUris.userSeriesInterests + '/' + series.id,
				this._getHeaders()
			)
		).json();
	}
}
