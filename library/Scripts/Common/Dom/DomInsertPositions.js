'use strict';

class DomInsertPositions extends StaticBaseClass
{
	static get BEFORE()
	{
		return 'before';
	}

	static get AFTER()
	{
		return 'after';
	}

	static get BEFORE_END()
	{
		return 'beforeend';
	}

	static get AFTER_BEGIN()
	{
		return 'afterbegin';
	}
}
