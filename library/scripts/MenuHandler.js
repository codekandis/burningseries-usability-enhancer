class MenuHandler
{
	constructor( selector )
	{
		this._selector = selector;
	}

	handle()
	{
		const eventHandlerMapping = {
			click:      ( event ) =>
			            {
				            if ( true === event.ctrlKey && true === event.altKey )
				            {
					            event.preventDefault();
					            event.currentTarget.querySelector( 'ul' ).style.display = 'block';
				            }
			            },
			mouseleave: ( event ) =>
			            {
				            event.currentTarget.querySelector( 'ul' ).style.display = 'none';
			            }
		};
		DomHelper.addEventHandlers( this._selector, eventHandlerMapping );
	}
}
