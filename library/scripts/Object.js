'use strict';

Object.prototype.keys = function ()
{
	return Object.keys( this );
};

Object.prototype.values = function ()
{
	return Object.values( this );
};

Object.prototype.forEach = function ( iteratorHandler )
{
	for ( const [ propertyName, propertyValue ] of Object.entries( this ) )
	{
		iteratorHandler( propertyName, propertyValue );
	}
};
