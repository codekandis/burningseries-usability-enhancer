class DomHelper
{
	static get INSERT_POSITION_BEFORE()
	{
		return 'before';
	};

	static get INSERT_POSITION_AFTER()
	{
		return 'after';
	};

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

	static remove( selector )
	{
		document
			.querySelectorAll( selector )
			.forEach(
				( element ) =>
				{
					element.remove();
				}
			);
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

	static insert( element, insertion, position )
	{
		switch ( position )
		{
			case DomHelper.INSERT_POSITION_BEFORE:
			{
				DomHelper.insertBefore( element, insertion );
				break;
			}
			case DomHelper.INSERT_POSITION_AFTER:
			{
				DomHelper.insertAfter( element, insertion );
				break;
			}
		}
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

	static insertAll( elements, insertion, position )
	{
		elements.forEach(
			( element ) =>
			{
				DomHelper.insert( element, insertion.cloneNode( true ), position );
			}
		);
	}
}
