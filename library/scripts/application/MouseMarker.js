'use strict';

class MouseMarker extends BaseClass
{
	constructor()
	{
		super();

		this._halfWidth  = null;
		this._halfHeight = null;
		this._marker     = null;
		this._initialize();
	}

	_initialize()
	{
		this._marker = DomHelper.createElementFromString( '<div data-control-type="MOUSE_MARKER">' );
		DomHelper.appendChild( document.body, this._marker );

		this._halfWidth  = Math.floor( this._marker.offsetWidth / 2 );
		this._halfHeight = Math.floor( this._marker.offsetHeight / 2 );
		this._hide();
	}

	_move( clientX, clientY )
	{
		this._marker.style.left = ( clientX - this._halfWidth + scrollX ) + 'px';
		this._marker.style.top  = ( clientY - this._halfHeight + scrollY ) + 'px';
	}

	_show()
	{
		this._marker.style.display = 'block';
	}

	_hide()
	{
		this._marker.style.display = 'none';
	}

	_getEventHandlerMappings()
	{
		return {
			keydown:   ( event ) =>
			           {
				           if ( true === event.ctrlKey && false === event.shiftKey && false === event.altKey )
				           {
					           this._show();

					           return;
				           }

				           this._hide();
			           },
			keyup:     ( event ) =>
			           {
				           this._hide();
			           },
			mousemove: ( event ) =>
			           {
				           this._move( event.clientX, event.clientY );
			           }
		};
	}

	markMouse()
	{
		DomHelper.addEventHandlersBySelector( 'html', this._getEventHandlerMappings() );
	}
}
