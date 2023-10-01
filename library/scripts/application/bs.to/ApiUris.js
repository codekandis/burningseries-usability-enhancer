'use strict';

class ApiUris extends BaseClass
{
	constructor( baseUri, userId )
	{
		super();

		this._relativeUris = {
			userSeriesDenials:           '/users/{{userId}}/series-denials',
			userSeriesDenialsFiltered:   '/users/{{userId}}/series-denials/filtered',
			userSeriesInterests:         '/users/{{userId}}/series-interests',
			userSeriesInterestsFiltered: '/users/{{userId}}/series-interests/filtered',
			userSeriesFavorites:         '/users/{{userId}}/series-favorites',
			userSeriesFavoritesFiltered: '/users/{{userId}}/series-favorites/filtered',
			userSeriesWatched:           '/users/{{userId}}/series-watched',
			userSeriesWatchedFiltered:   '/users/{{userId}}/series-watched/filtered'
		};

		this._baseUri = baseUri;
		this._userId  = userId;
	}

	get userSeriesDenials()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesDenials );
	}

	get userSeriesDenialsFiltered()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesDenialsFiltered );
	}

	get userSeriesInterests()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesInterests );
	}

	get userSeriesInterestsFiltered()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesInterestsFiltered );
	}

	get userSeriesFavorites()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesFavorites );
	}

	get userSeriesFavoritesFiltered()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesFavoritesFiltered );
	}

	get userSeriesWatched()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesWatched );
	}

	get userSeriesWatchedFiltered()
	{
		return this._baseUri + this._replaceUriPlaceHolders( this._relativeUris.userSeriesWatchedFiltered );
	}

	_replaceUriPlaceHolders( uri )
	{
		let replacedUri = uri;
		replacedUri     = replacedUri.replace( '{{userId}}', this._userId );

		return replacedUri;
	}
}
