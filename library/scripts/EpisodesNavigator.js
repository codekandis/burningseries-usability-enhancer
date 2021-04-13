class EpisodesNavigator
{
	constructor()
	{
		this._navigator = null;
		this._buttons   = null;
		this._initialize();
	}

	_initialize()
	{
		this._buttons   = DomHelper.createElementFromString( '<ul></ul>' );
		this._navigator = DomHelper.createElementFromString( '<div></div>', 'codekandis-episodesNavigator', 'frame' );
		this._navigator.appendChild( this._buttons );
	}

	async _getEnclosingEpisodesOfSeason( uri )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				( new BsToController() )
					.readEpisodes( uri )
					.then(
						( responseData ) =>
						{
							const episodes = [ ...responseData.querySelectorAll( 'table.episodes tbody tr:first-child td:nth-child(1) a, table.episodes tbody tr:last-child td:nth-child(1) a' ) ]
								.map(
									( element ) =>
									{
										return element.href;
									}
								)
							resolveHandler(
								{
									first: episodes[ 0 ],
									last:  episodes[ 1 ],
								}
							);
						}
					);
			}
		);
	}

	get _seasons()
	{
		const seasonsContainer   = document.querySelector( '#seasons ul' );
		const seasons            = [ ...seasonsContainer.querySelectorAll( 'li a' ) ]
			.map(
				( element ) =>
				{
					return element.href;
				}
			);
		const currentSeasonIndex = seasons.indexOf(
			seasonsContainer.querySelector( 'li.active a' ).href
		);

		return {
			list:         seasons,
			currentIndex: currentSeasonIndex
		}
	}

	get _episodes()
	{
		const episodesContainer   = document.querySelector( '#episodes ul' );
		const episodes            = [ ...episodesContainer.querySelectorAll( 'li a' ) ]
			.map(
				( element ) =>
				{
					return element.href;
				}
			);
		const currentEpisodeIndex = episodes.indexOf(
			episodesContainer.querySelector( 'li.active a' ).href
		);

		return {
			list:         episodes,
			currentIndex: currentEpisodeIndex
		}
	}

	_navigateBackward( seasons, episodes )
	{
		if ( 0 !== episodes.currentIndex )
		{
			window.location.href = episodes.list[ episodes.currentIndex - 1 ];

			return;
		}

		this._getEnclosingEpisodesOfSeason( seasons.list[ seasons.currentIndex - 1 ] )
			.then(
				( enlosingEpisodes ) =>
				{
					window.location.href = enlosingEpisodes.last;
				}
			);
	}

	_navigateForward( seasons, episodes )
	{
		if ( episodes.list.length - 1 !== episodes.currentIndex )
		{
			window.location.href = episodes.list[ episodes.currentIndex + 1 ];

			return;
		}

		this._getEnclosingEpisodesOfSeason( seasons.list[ seasons.currentIndex + 1 ] )
			.then(
				( enlosingEpisodes ) =>
				{
					window.location.href = enlosingEpisodes.first;
				}
			);
	}

	_addEvents( buttons )
	{
		const nullHandler = ( event ) =>
		{
			event.preventDefault();
		};

		const seasons  = this._seasons;
		const episodes = this._episodes;

		if ( 0 === seasons.currentIndex && 0 === episodes.currentIndex )
		{
			buttons.previousEpisode.addEventListener( 'click', nullHandler );
			buttons.previousEpisode.classList.add( 'disabled' );
		}
		else
		{
			buttons.previousEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
					this._navigateBackward( seasons, episodes );
				}
			);
		}

		if ( seasons.list.length - 1 === seasons.currentIndex && episodes.list.length - 1 === episodes.currentIndex )
		{
			buttons.nextEpisode.addEventListener( 'click', nullHandler );
			buttons.nextEpisode.classList.add( 'disabled' );
		}
		else
		{
			buttons.nextEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
					this._navigateForward( seasons, episodes );
				}
			);
		}
	}

	addNavigation()
	{
		DomHelper.insertBefore(
			document.querySelector( '.serie .selectors' ),
			this._navigator
		);

		const buttons = {
			previousEpisode: DomHelper.createElementFromString( '<li><a href="#">Previous</a></li>' ),
			nextEpisode:     DomHelper.createElementFromString( '<li><a href="#">Next</a></li>' )
		};

		buttons.forEach(
			( elementName, element ) =>
			{
				this._buttons.appendChild( element );
			}
		);

		this._addEvents( buttons );
	}
}
