'use strict';

class Debugger extends StaticBaseClass
{
	static log( ...values )
	{
		if ( DebugMode.MODE_ENABLED === DebugMode.mode )
		{
			values.forEach(
				( value ) =>
				{
					console.log( value );
				}
			);
		}
	}
}
