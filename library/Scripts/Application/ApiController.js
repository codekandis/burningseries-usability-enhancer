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

	async readUserSeriesDenialsAsync()
	{
		return await (
			await this.#_ajaxController.getAsync(
				this.#_apiUris.userSeriesDenials,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesDenialsFilteredAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesDenialsFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesDenialAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesDenials,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesDenialAsync( series )
	{
		return await (
			await this.#_ajaxController.deleteAsync(
				this.#_apiUris.userSeriesDenials + '/' + series.denialId,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesInterestsAsync()
	{
		return await (
			await this.#_ajaxController.getAsync(
				this.#_apiUris.userSeriesInterests,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesInterestsFilteredAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesInterestsFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesInterestAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesInterests,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesInterestAsync( series )
	{
		return await (
			await this.#_ajaxController.deleteAsync(
				this.#_apiUris.userSeriesInterests + '/' + series.interestId,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesFavoritesAsync()
	{
		return await (
			await this.#_ajaxController.getAsync(
				this.#_apiUris.userSeriesFavorites,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesFavoritesFilteredAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesFavoritesFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesFavoriteAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesFavorites,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesFavoriteAsync( series )
	{
		return await (
			await this.#_ajaxController.deleteAsync(
				this.#_apiUris.userSeriesFavorites + '/' + series.favoriteId,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesWatchedAsync()
	{
		return await (
			await this.#_ajaxController.getAsync(
				this.#_apiUris.userSeriesWatched,
				this.#getHeaders()
			)
		)
			.json();
	}

	async readUserSeriesWatchedFilteredAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesWatchedFiltered,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async addUserSeriesWatchAsync( series )
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
			await this.#_ajaxController.putAsync(
				this.#_apiUris.userSeriesWatched,
				this.#getHeaders(),
				requestData
			)
		)
			.json();
	}

	async deleteUserSeriesWatchAsync( series )
	{
		return await (
			await this.#_ajaxController.deleteAsync(
				this.#_apiUris.userSeriesWatched + '/' + series.watchId,
				this.#getHeaders()
			)
		)
			.json();
	}
}
