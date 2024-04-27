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
		this.#hide();
	}

	#move( clientX, clientY )
	{
		this.#_marker.style.left = ( clientX - this.#_halfWidth + scrollX ) + 'px';
		this.#_marker.style.top  = ( clientY - this.#_halfHeight + scrollY ) + 'px';
	}

	#show()
	{
		this.#_marker.style.display = null;
	}

	#hide()
	{
		this.#_marker.style.display = 'none';
	}

	#getEventHandlerMappings()
	{
		return {
			keydown:   ( event ) =>
			           {
				           if ( true === event.ctrlKey && false === event.shiftKey && false === event.altKey )
				           {
					           this.#show();

					           return;
				           }

				           this.#hide();
			           },
			keyup:     ( event ) =>
			           {
				           this.#hide();
			           },
			mousemove: ( event ) =>
			           {
				           this.#move( event.clientX, event.clientY );
			           }
		};
	}

	markMouse()
	{
		DomHelper.addEventHandlersBySelector( 'html', this.#getEventHandlerMappings() );
	}
}
