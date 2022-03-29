'use strict';

class StaticBaseClass
{
	constructor()
	{
		throw InvalidStaticClassInstantiationException.with_OBJECT( this );
	}
}
