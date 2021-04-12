class MouseMarker
{
	constructor()
	{
		this._id         = 'codekandis-mouseMarker';
		this._halfWidth  = null;
		this._halfHeight = null;
		this._marker     = null;
		this._initialize();
	}

	_initialize()
	{
		this._marker = DomHelper.createElementFromString( '<div>', this._id );
		document.body.appendChild( this._marker );

		this._halfWidth  = Math.floor( this._marker.offsetWidth / 2 );
		this._halfHeight = Math.floor( this._marker.offsetHeight / 2 );
		this._hide();
	}

	_move( clientX, clientY )
	{
		this._marker.style.left = ( clientX - this._halfWidth ) + 'px';
		this._marker.style.top  = ( clientY - this._halfHeight ) + 'px';
	}

	_show()
	{
		this._marker.style.display = 'block';
	}

	_hide()
	{
		this._marker.style.display = 'none';
	}

	markMouse()
	{
		const eventHandlerMapping = {
			keydown:   ( event ) =>
			           {
				           if ( true === event.ctrlKey )
				           {
					           this._show();
				           }
			           },
			keyup:     ( event ) =>
			           {
				           if ( false === event.ctrlKey )
				           {
					           this._hide();
				           }
			           },
			mousemove: ( event ) =>
			           {
				           this._move( event.clientX, event.clientY );
			           }
		}

		DomHelper.addEventHandlers( 'html', eventHandlerMapping );
	}
}
