'use strict';

class Series extends BaseClass
{
	#_isSeries   = false;
	#_denialId   = null;
	#_isDenial   = false;
	#_interestId = null;
	#_isInterest = false;
	#_favoriteId = null;
	#_isFavorite = false;
	#_watchId    = null;
	#_isWatch    = false;
	#_container;
	#_name;
	#_uri;

	constructor( container, name, uri )
	{
		super();

		this.#_container = container;
		this.#_name      = name;
		this.#_uri       = uri;
	}

	get container()
	{
		return this.#_container;
	}

	get name()
	{
		return this.#_name;
	}

	get uri()
	{
		return this.#_uri;
	}

	set isSeries( isSeries )
	{
		this.#_isSeries = isSeries;

		switch ( this.#_isSeries )
		{
			case false:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-Series', SeriesIsSeries.FALSE );

				return;
			}
			case true:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-Series', SeriesIsSeries.TRUE );

				return;
			}
		}
	}

	get denialId()
	{
		return this.#_denialId;
	}

	set denialId( denialId )
	{
		this.#_denialId = denialId;

		switch ( this.#_denialId )
		{
			case null:
			{
				DomHelper.setAttribute( this.#_container, 'data-denial-id', SeriesDenialId.NULL );

				return;
			}
			default:
			{
				DomHelper.setAttribute( this.#_container, 'data-denial-id', denialId );

				return;
			}
		}
	}

	get isDenial()
	{
		return this.#_isDenial;
	}

	set isDenial( isDenial )
	{
		this.#_isDenial = isDenial;

		switch ( this.#_isDenial )
		{
			case false:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-denial', SeriesIsDenial.FALSE );

				return;
			}
			case true:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-denial', SeriesIsDenial.TRUE );

				return;
			}
		}
	}

	get interestId()
	{
		return this.#_interestId;
	}

	set interestId( interestId )
	{
		this.#_interestId = interestId;

		switch ( this.#_interestId )
		{
			case null:
			{
				DomHelper.setAttribute( this.#_container, 'data-interest-id', SeriesInterestId.NULL );

				return;
			}
			default:
			{
				DomHelper.setAttribute( this.#_container, 'data-interest-id', interestId );

				return;
			}
		}
	}

	get isInterest()
	{
		return this.#_isInterest;
	}

	set isInterest( isInterest )
	{
		this.#_isInterest = isInterest;

		switch ( this.#_isInterest )
		{
			case false:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-interest', SeriesIsInterest.FALSE );

				return;
			}
			case true:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-interest', SeriesIsInterest.TRUE );

				return;
			}
		}
	}

	get favoriteId()
	{
		return this.#_favoriteId;
	}

	set favoriteId( favoriteId )
	{
		this.#_favoriteId = favoriteId;

		switch ( this.#_favoriteId )
		{
			case null:
			{
				DomHelper.setAttribute( this.#_container, 'data-favorite-id', SeriesFavoriteId.NULL );

				return;
			}
			default:
			{
				DomHelper.setAttribute( this.#_container, 'data-favorite-id', favoriteId );

				return;
			}
		}
	}

	get isFavorite()
	{
		return this.#_isFavorite;
	}

	set isFavorite( isFavorite )
	{
		this.#_isFavorite = isFavorite;

		switch ( this.#_isFavorite )
		{
			case false:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-favorite', SeriesIsFavorite.FALSE );

				return;
			}
			case true:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-favorite', SeriesIsFavorite.TRUE );

				return;
			}
		}
	}

	get watchId()
	{
		return this.#_watchId;
	}

	set watchId( watchId )
	{
		this.#_watchId = watchId;

		switch ( this.#_watchId )
		{
			case null:
			{
				DomHelper.setAttribute( this.#_container, 'data-watch-id', SeriesWatchId.NULL );

				return;
			}
			default:
			{
				DomHelper.setAttribute( this.#_container, 'data-watch-id', watchId );

				return;
			}
		}
	}

	get isWatch()
	{
		return this.#_isWatch;
	}

	set isWatch( isWatch )
	{
		this.#_isWatch = isWatch;

		switch ( this.#_isWatch )
		{
			case false:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-watch', SeriesIsWatch.FALSE );

				return;
			}
			case true:
			{
				DomHelper.setAttribute( this.#_container, 'data-is-watch', SeriesIsWatch.TRUE );

				return;
			}
		}
	}

	remove()
	{
		this.#_container.remove();
	}
}
