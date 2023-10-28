'use strict';

class PreDispatchmentState extends BaseClass
{
	#_preventDispatchment = false;

	get preventDispatchment()
	{
		return this.#_preventDispatchment;
	}

	set preventDispatchment( value )
	{
		this.#_preventDispatchment = value;
	}
}
