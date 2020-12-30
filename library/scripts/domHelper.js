console.log( 'codekandis/burningseries-latest-episodes-cleaner: library/scripts/domHelper' );

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
}
