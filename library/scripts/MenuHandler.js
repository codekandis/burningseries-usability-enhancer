class MenuHandler
{
	constructor( selector )
	{
		this._selector = selector;
	}

	handle()
	{
		const eventHandlerMapping = {
			click: ( event ) =>
			       {
				       if ( true === event.ctrlKey && true === event.altKey )
				       {
					       event.preventDefault();
					       const submenu         = event.currentTarget.querySelector( 'ul' );
					       submenu.style.display = 'block' === submenu.style.display ? 'none' : 'block';
				       }
			       }
		};
		DomHelper.addEventHandlers( this._selector, eventHandlerMapping );
	}
}
