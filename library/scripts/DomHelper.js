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

	static addEventHandler( element, event, handler )
	{
		element.addEventListener( event, handler );
	}

	static addEventHandlers( element, eventHandlerMapping )
	{
		eventHandlerMapping.forEach(
			( eventName, eventHandler ) =>
			{
				DomHelper.addEventHandler( element, eventName, eventHandler );
			}
		);
	}

	static addEventHandlerBySelector( selector, event, handler )
	{
		document
			.querySelectorAll( selector )
			.forEach(
				( element ) =>
				{
					DomHelper.addEventHandler( element, event, handler );
				}
			);
	}

	static addEventHandlersBySelector( selector, eventHandlerMapping )
	{
		document
			.querySelectorAll( selector )
			.forEach(
				( element ) =>
				{
					DomHelper.addEventHandlers( element, eventHandlerMapping );
				}
			);
	}

	static appendChild( element, child )
	{
		element.appendChild( child );
	}

	static appendChildren( element, children )
	{
		children.forEach(
			( child ) =>
			{
				DomHelper.appendChild( element, child );
			}
		)
	}

	static insertBefore( element, insertion )
	{
		element.parentNode.insertBefore( insertion, element );
	}

	static insertAfter( element, insertion )
	{
		element.parentNode.insertBefore( insertion, element.nextSibling );
	}

	static insertBeforeAll( elements, insertion )
	{
		elements.forEach(
			( element ) =>
			{
				DomHelper.insertBefore( element, insertion.cloneNode( true ) );
			}
		);
	}

	static insertAfterAll( elements, insertion )
	{
		elements.forEach(
			( element ) =>
			{
				DomHelper.insertAfter( element, insertion.cloneNode( true ) );
			}
		);
	}
}
