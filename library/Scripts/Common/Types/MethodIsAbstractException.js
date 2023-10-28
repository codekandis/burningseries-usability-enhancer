'use strict';

class MethodIsAbstractException extends LogicException
{
	static with_classNameAndMethodName( className, methodName )
	{
		return new this(
			String.format`The method \`${ 0 }::${ 1 }()\` is declared abstract and therefore must be defined.`( className, methodName )
		)
	}

	static with_classNameAndMethod( className, method )
	{
		return this.with_classNameAndMethodName( className, method.name );
	}

	static with_objectAndMethodName( object, methodName )
	{
		return this.with_classNameAndMethodName( object.__proto__.constructor.name, methodName );
	}

	static with_objectAndMethod( object, method )
	{
		return this.with_classNameAndMethodName( object.__proto__.constructor.name, method.name );
	}
}
