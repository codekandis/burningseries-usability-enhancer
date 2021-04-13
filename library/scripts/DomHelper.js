class DomHelper
{
	static createElementFromString( htmlString, idName = null, classNames = null )
	{
		const container     = document.createElement( 'div' );
		container.innerHTML = htmlString.trim();

		const element = container.firstChild;
		if ( null !== idName )
		{
			element.setAttribute( 'id', idName );
		}
		if ( null !== classNames )
		{
			element.setAttribute( 'class', classNames );
		}

		return element;
	}

	static createElementsFromString( htmlString )
	{
		const container     = document.createElement( 'div' );
		container.innerHTML = htmlString.trim();

		return container;
	}

	static addEventHandler( selector, event, handler )
	{
		document
			.querySelectorAll( selector )
			.forEach(
				( element ) =>
				{
					element.addEventListener( event, handler );
				}
			);
	}

	static addEventHandlers( selector, eventHandlerMapping )
	{
		eventHandlerMapping.forEach(
			( eventName, eventHandler ) =>
			{
				DomHelper.addEventHandler( selector, eventName, eventHandler );
			}
		);
	}

	static insertBefore( element, insertion )
	{
		element.parentNode.insertBefore( insertion, element );
	}

	static insertAfter( element, insertion )
	{
		element.parentNode.insertAfter( insertion, element );
	}
}
