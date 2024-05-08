'use strict';

class MouseMarker extends BaseClass
{
	#_halfWidth  = null;
	#_halfHeight = null;
	#_marker     = null;

	constructor()
	{
		super();

		this.#initialize();
	}

	#initialize()
	{
		this.#_marker = DomHelper.createElementFromString( '<div data-control-type="MOUSE_MARKER">' );
		DomHelper.appendChild( document.body, this.#_marker );

		this.#_halfWidth  = Math.floor( this.#_marker.offsetWidth / 2 );
		this.#_halfHeight = Math.floor( this.#_marker.offsetHeight / 2 );
		this.#hideAsync();
	}

	async #moveAsync( clientX, clientY )
	{
		this.#_marker.style.left = ( clientX - this.#_halfWidth + scrollX ) + 'px';
		this.#_marker.style.top  = ( clientY - this.#_halfHeight + scrollY ) + 'px';
	}

	async #showAsync()
	{
		this.#_marker.style.display = null;
	}

	async #hideAsync()
	{
		this.#_marker.style.display = 'none';
	}

	async #getEventHandlerMappingsAsync()
	{
		return {
			keydown:   ( event ) =>
			           {
				           if ( false === event.ctrlKey && true === event.shiftKey && false === event.altKey )
				           {
					           this.#showAsync();

					           return;
				           }

				           this.#hideAsync();
			           },
			keyup:     ( event ) =>
			           {
				           this.#hideAsync();
			           },
			mousemove: ( event ) =>
			           {
				           this.#moveAsync( event.clientX, event.clientY );
			           }
		};
	}

	async markMouseAsync()
	{
		DomHelper.addEventHandlersBySelector( 'html', await this.#getEventHandlerMappingsAsync() );
	}
}
