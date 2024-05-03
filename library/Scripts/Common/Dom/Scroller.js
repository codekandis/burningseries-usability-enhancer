'use strict';

class Scroller extends BaseClass
{
	async scrollToAsync( x, y )
	{
		window.scrollTo( x, y );
	}

	async scrollToElementAsync( element, x, y )
	{
		element.scrollTo( x, y );
	}

	async scrollToElementLeftAsync( element )
	{
		window.scrollTo(
			element
				.getBoundingClientRect()
				.left,
			window.scrollY
		);
	}

	async scrollToElementRightAsync( element )
	{
		window.scrollTo(
			element
				.getBoundingClientRect()
				.right,
			window.scrollY
		);
	}

	async scrollToElementTopAsync( element )
	{
		window.scrollTo(
			window.scrollX,
			element
				.getBoundingClientRect()
				.top
		);
	}

	async scrollToElementBottomAsync( element )
	{
		window.scrollTo(
			window.scrollX,
			element
				.getBoundingClientRect()
				.bottom
		);
	}
}
