console.log( 'codekandis/burningseries-latest-episodes-cleaner: library/scripts/object' );

Object.prototype.forEach = function( iteratorHandler )
{
	for ( const [ propertyName, propertyValue ] of Object.entries( this ) )
	{
		iteratorHandler( propertyName, propertyValue );
	}
};
