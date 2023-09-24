'use strict';

class InvalidStaticClassInstantiationException extends Exception
{
	static with_CLASS_NAME( className )
	{
		return new InvalidStaticClassInstantiationException(
			String.format`The static class \`${ 0 }\` cannot be instantiated.`( className )
		);
	}

	static with_OBJECT( obj )
	{
		return InvalidStaticClassInstantiationException.with_CLASS_NAME( obj.__proto__.constructor.name );
	}
}
