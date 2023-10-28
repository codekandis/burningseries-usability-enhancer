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

	append()
	{
		DomHelper.addEventHandler( this.#_menuFilter, 'click', this.#inputElement_click );
		DomHelper.addEventHandler( this.#_menuFilter, 'input', this.#inputElement_change );
	}

	#inputElement_click = ( event ) =>
	{
		event.preventDefault();
		event.stopPropagation();
	};

	#inputElement_change = ( event ) =>
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
