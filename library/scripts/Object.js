Object.prototype.forEach = function ( iteratorHandler )
{
	for ( const [ propertyName, propertyValue ] of Object.entries( this ) )
	{
		iteratorHandler( propertyName, propertyValue );
	}
};
