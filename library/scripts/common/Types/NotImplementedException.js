'use strict';

class NotImplementedException extends Exception
{
	static with_METHOD_NAME( methodName )
	{
		return new NotImplementedException(
			String.format`The method \`${ 0 }\` has not been implemented.`( methodName )
		);
	}
}
