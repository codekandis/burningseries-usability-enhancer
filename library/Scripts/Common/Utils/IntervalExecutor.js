'use strict';

class IntervalExecutor extends BaseClass
{
	#_interval;
	#_callbackAsync;

	constructor( interval, callbackAsync )
	{
		super();

		this.#_interval      = interval;
		this.#_callbackAsync = callbackAsync;
	}

	#executeCallbackByTimeout()
	{
		window.setTimeout( this.#executeCallbackAsync, this.#_interval );
	}

	#executeCallbackAsync = async () =>
	{
		await this.#_callbackAsync();

		this.#executeCallbackByTimeout();
	}

	async executeAsync( immediate )
	{
		if ( true === immediate )
		{
			this.#executeCallbackAsync();

			return;
		}

		this.#executeCallbackByTimeout();
	}
}
