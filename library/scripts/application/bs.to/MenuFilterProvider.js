'use strict';

class MenuFilterProvider extends BaseClass
{
	constructor( menuFilter, menuContainer )
	{
		super();

		this._menuFilter    = menuFilter;
		this._menuContainer = menuContainer;
	}

	append()
	{
		DomHelper.addEventHandler( this._menuFilter, 'click', this._inputElement_click );
		DomHelper.addEventHandler( this._menuFilter, 'input', this._inputElement_change );
	}

	_inputElement_click = ( event ) =>
	{
		event.preventDefault();
		event.stopPropagation();
	};

	_inputElement_change = ( event ) =>
	{
		const keywords = [
			...new Set(
				this
					._menuFilter
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

		const series = DomHelper.querySelectorAll( '[data-is-series="TRUE"]', this._menuContainer );

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
