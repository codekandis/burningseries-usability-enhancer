'use strict';

class NewestEpisodesLoader extends BaseClass
{
	#_bsToController;

	constructor( bsToController )
	{
		super();

		this.#_bsToController = bsToController;
	}

	async #replaceNewestEpisodesAsync( newestEpisodes )
	{
		const currentNewestEpisodes = DomHelper.querySelector( '#newest_episodes' );
		DomHelper.replaceWith( currentNewestEpisodes, newestEpisodes );
	}

	async loadAsync()
	{
		const uri            = String.format`${ 0 }//${ 1 }`( window.location.protocol, window.location.hostname );
		const newestEpisodes = await this.#_bsToController.readNewestEpisodesAsync( uri );
		this.#replaceNewestEpisodesAsync( newestEpisodes );
	}
}
