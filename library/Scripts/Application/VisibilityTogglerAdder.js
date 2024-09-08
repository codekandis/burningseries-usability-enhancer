'use strict';

class VisibilityTogglerAdder extends BaseClass
{
	#_areVisible = true;
	#_element;
	#_episodes;

	constructor( episodes )
	{
		super();

		this.#_episodes = episodes;
	}

	async #setVisibilityAsync()
	{
		const areVisibleString = true !== this.#_areVisible
			? 'FALSE'
			: 'TRUE';

		this.#_element.setAttribute( 'data-is-visible', areVisibleString );

		this
			.#_episodes
			.series
			.forEach(
				( series ) =>
				{
					if ( true === series.isFavorite || true === series.isInterest || true === series.isWatch )
					{
						series.container.setAttribute( 'data-is-visible', areVisibleString );
					}
				}
			);
	}

	async #toggleAsync()
	{
		this.#_areVisible = !this.#_areVisible;
		await this.#setVisibilityAsync();
	}

	async addVisibilityTogglerAsync()
	{
		this.#_element  = DomHelper.createElementFromString( '<button data-control-type="VISIBILITY_TOGGLER"><i class="fas fa-eye"/></button>' );
		DomHelper.addEventHandler( this.#_element, 'click', this.#visibilityToggler_click );

		const sibling = DomHelper.querySelector( '#serInput' );
		DomHelper.insertBefore( sibling, this.#_element );

		await this.#setVisibilityAsync();
	}

	#visibilityToggler_click = async ( event ) =>
	{
		event.preventDefault();
		event.stopPropagation();

		this.#toggleAsync();
	};
}
