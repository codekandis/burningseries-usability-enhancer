'use strict';

class DomElementNotFoundException extends Exception
{
	static with_UNRESOLVABLE_SELECTOR( selector )
	{
		return new DomElementNotFoundException( String.format`The selector \`${ 0 }\` cannot be resolved.`( selector ) );
	}
}
