'use strict';

Array.prototype.one = function ( predicate )
{
	return this.every(
		( element ) =>
		{
			return predicate( element );
		}
	)
}
