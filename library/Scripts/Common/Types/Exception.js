'use strict';

class Exception extends Error
{
	#_message;

	constructor( message )
	{
		super( message );

		this.#_message = message;
	}

	get message()
	{
		return this.#_message;
	}
}
