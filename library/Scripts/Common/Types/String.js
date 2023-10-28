'use strict';

String.format = function ( strings, ...keys )
{
	return (
		function ( ...values )
		{
			const dict   = values[ values.length - 1 ] || {};
			const result = [
				strings[ 0 ]
			];

			keys.forEach(
				( key, index ) =>
				{
					result.push(
						true === Number.isInteger( key )
							? values[ key ]
							: dict[ key ],
						strings[ index + 1 ]
					);
				}
			);

			return result.join( '' );
		}
	);
}
