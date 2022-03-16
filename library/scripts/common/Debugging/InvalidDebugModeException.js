'use strict';

class InvalidDebugModeException extends Exception
{
	static with_DEBUG_MODE( debugMode )
	{
		return new InvalidDebugModeException( String.format`The debug mode \`${ 0 }\` is invalid.`( debugMode ) );
	}
}
