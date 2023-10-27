'use strict';

class Exception extends Error
{
	#_message;

	constructor( message )
	{
		super();

		this.#_message = message;
	}

	get message()
	{
		return this.#_message;
	}
}
