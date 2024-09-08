'use strict';

class MenuFilterProvider extends BaseClass
{
	#_menuFilter;
	#_menuContainer;

	constructor( menuFilter, menuContainer )
	{
		super();

		this.#_menuFilter    = menuFilter;
		this.#_menuContainer = menuContainer;
	}

	#resetFilter( filter )
	{
		filter.value = '';
		filter.dispatchEvent( new Event( 'input' ) );
	}

	async appendAsync()
	{
		DomHelper.addEventHandler( this.#_menuFilter, 'keyup', this.#inputElement_keyup );
		DomHelper.addEventHandler( this.#_menuFilter, 'click', this.#inputElement_click );
		DomHelper.addEventHandler( this.#_menuFilter, 'dblclick', this.#inputElement_dblclick );
		DomHelper.addEventHandler( this.#_menuFilter, 'input', this.#inputElement_input );
	}

	#inputElement_keyup = ( event ) =>
	{
		if ( 'Escape' === event.key )
		{
			this.#resetFilter( event.target );
		}
	};

	#inputElement_click = ( event ) =>
	{
		event.preventDefault();
		event.stopPropagation();
	};

	#inputElement_dblclick = ( event ) =>
	{
		event.preventDefault();
		event.stopPropagation();

		this.#resetFilter( event.target );
	};

	#inputElement_input = ( event ) =>
	{
		const keywords = [
			...new Set(
				this
					.#_menuFilter
					.value
					.trim()
					.toLowerCase()
					.split( ' ' )
					.filter(
						( keyword ) =>
						{
							return '' !== keyword;
						}
					)
			)
		];

		const series = DomHelper.querySelectorAll( '[data-is-Series="TRUE"]', this.#_menuContainer );

		series.forEach(
			( series ) =>
			{
				const name = DomHelper.querySelector(
					'a',
					series
				)
					.textContent;

				const isMatching = keywords.every
				(
					( keyword ) =>
					{
						return -1 !== name.indexOf( keyword );
					}
				)

				series.style.display = false === isMatching
					? 'none'
					: null
			}
		);
	};
}
