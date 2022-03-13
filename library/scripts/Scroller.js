'use strict';

class Scroller
{
	scrollTo( x, y )
	{
		window.scrollTo( x, y );
	}

	scrollToElement( element, x, y )
	{
		element.scrollTo( x, y );
	}

	scrollToElementLeft( element )
	{
		window.scrollTo( element.getBoundingClientRect().left, window.scrollY );
	}

	scrollToElementRight( element )
	{
		window.scrollTo( element.getBoundingClientRect().right, window.scrollY );
	}

	scrollToElementTop( element )
	{
		window.scrollTo( window.scrollX, element.getBoundingClientRect().top );
	}

	scrollToElementBottom( element )
	{
		window.scrollTo( window.scrollX, element.getBoundingClientRect().bottom );
	}
}
