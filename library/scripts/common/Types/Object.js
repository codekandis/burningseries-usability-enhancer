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
		iteratorHandler( propertyValue, propertyName );
	}
};

Object.prototype.every = function ( iteratorHandler )
{
	for ( const [ propertyName, propertyValue ] of Object.entries( this ) )
	{
		if ( false === iteratorHandler( propertyValue, propertyName ) )
		{
			break;
		}
	}
};

Object.prototype.bindTo = function ( method, ...args )
{
	return method.bind( this, ...args );
};

Object.prototype.bindToAll = function ( methods, ...args )
{
	return methods.map(
		( method ) =>
		{
			return this.bindTo( method, ...args );
		}
	);
};

Object.prototype.bindToEventHandler = function ( method, ...args )
{
	return function ( event )
	{
		method.bind( this )( event, ...args );
	}
		.bind( this );
}

Object.prototype.bindToEventHandlers = function ( methods, ...args )
{
	return methods.map(
		( method ) =>
		{
			this.bindToEventHandler( method, ...args );
		}
	);
}
