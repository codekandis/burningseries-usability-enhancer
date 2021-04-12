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

	_addEvents( buttons )
	{
		const episodesContainer   = document.querySelector( '#episodes ul' );
		const episodes            = episodesContainer.querySelectorAll( 'li' );
		const currentEpisode      = episodesContainer.querySelector( 'li.active' );
		const currentEpisodeIndex = Array.prototype.indexOf.call( episodes, currentEpisode );

		if ( 0 === currentEpisodeIndex )
		{
			buttons.previousEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
				}
			);
			buttons.previousEpisode.classList.add( 'disabled' );
		}
		else
		{
			buttons.previousEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
					const targetEpisodeIndex = currentEpisodeIndex - 1;
					window.location.href     = episodesContainer.querySelectorAll( 'li a' )[ targetEpisodeIndex ].href;
				}
			);
		}

		if ( episodes.length - 1 === currentEpisodeIndex )
		{
			buttons.nextEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
				}
			);
			buttons.nextEpisode.classList.add( 'disabled' );
		}
		else
		{
			buttons.nextEpisode.addEventListener(
				'click',
				( event ) =>
				{
					event.preventDefault();
					const targetEpisodeIndex = currentEpisodeIndex + 1;
					window.location.href     = episodesContainer.querySelectorAll( 'li a' )[ targetEpisodeIndex ].href;
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
			nextEpisode:     DomHelper.createElementFromString( '<li><a href="#">Next</a></li>' ),
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
