'use strict';

class ApiController extends BaseClass
{
	#_ajaxController = new AjaxController();
	#_apiBaseUri;
	#_apiUserId;
	#_apiKey;
	#_apiUris;

	constructor( apiBaseUri, apiUserId, apiKey )
	{
		super();

		this.#_apiBaseUri = apiBaseUri;
		this.#_apiUserId  = apiUserId;
		this.#_apiKey     = apiKey;
		this.#_apiUris    = new ApiUris( apiBaseUri, apiUserId );
	}

	#getHeaders()
	{
		return {
			Authorization:  'Key ' + this.#_apiKey,
			'Content-Type': ContentTypes.APPLICATION_JSON_UTF8
		};
	}

	#createJsonData( data )
	{
		return JSON.stringify( data );
	}

	async readUserSeriesDenials()
	{
		return await (
			await this.#_ajaxController.get(
				this.#_apiUris.userSeriesDenials,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesDenialsFiltered( series )
	{
		const requestData = this.#createJsonData(
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

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesDenialsFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesDenial( series )
	{
		const requestData = this.#createJsonData(
			{
				seriesDenial:
					{
						name: series.name,
						uri:  series.uri
					}
			}
		);

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesDenials,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesDenial( series )
	{
		return await (
			await this.#_ajaxController.delete(
				this.#_apiUris.userSeriesDenials + '/' + series.denialId,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesInterests()
	{
		return await (
			await this.#_ajaxController.get(
				this.#_apiUris.userSeriesInterests,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesInterestsFiltered( series )
	{
		const requestData = this.#createJsonData(
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

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesInterestsFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesInterest( series )
	{
		const requestData = this.#createJsonData(
			{
				seriesInterest:
					{
						name: series.name,
						uri:  series.uri
					}
			}
		);

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesInterests,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesInterest( series )
	{
		return await (
			await this.#_ajaxController.delete(
				this.#_apiUris.userSeriesInterests + '/' + series.interestId,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesFavorites()
	{
		return await (
			await this.#_ajaxController.get(
				this.#_apiUris.userSeriesFavorites,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesFavoritesFiltered( series )
	{
		const requestData = this.#createJsonData(
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

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesFavoritesFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesFavorite( series )
	{
		const requestData = this.#createJsonData(
			{
				seriesFavorite:
					{
						name: series.name,
						uri:  series.uri
					}
			}
		);

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesFavorites,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesFavorite( series )
	{
		return await (
			await this.#_ajaxController.delete(
				this.#_apiUris.userSeriesFavorites + '/' + series.favoriteId,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesWatched()
	{
		return await (
			await this.#_ajaxController.get(
				this.#_apiUris.userSeriesWatched,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesWatchedFiltered( series )
	{
		const requestData = this.#createJsonData(
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

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesWatchedFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesWatch( series )
	{
		const requestData = this.#createJsonData(
			{
				seriesWatch:
					{
						name: series.name,
						uri:  series.uri
					}
			}
		);

		return await (
			await this.#_ajaxController.put(
				this.#_apiUris.userSeriesWatched,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesWatch( series )
	{
		return await (
			await this.#_ajaxController.delete(
				this.#_apiUris.userSeriesWatched + '/' + series.watchId,
				this.#getHeaders()
			)
		)
			.json();
	}
}
