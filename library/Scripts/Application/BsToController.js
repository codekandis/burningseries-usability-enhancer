'use strict';

class BsToController extends BaseClass
{
	#_ajaxController = new AjaxController();

	constructor()
	{
		super();
	}

	async #readAsHtmlDocument( uri )
	{
		const htmlString = await (
			await this
				.#_ajaxController
				.get( uri, [] )
		)
			.text();

		return ( new DOMParser() )
			.parseFromString( htmlString, ContentTypes.TEXT_HTML );
	}

	async readEpisodes( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocument( uri );

		return [
			...DomHelper.querySelectorAll( 'table.episodes tbody tr td:nth-child( 1 ) a', htmlDocument, false )
		];
	}

	async readWatchStates( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocument( uri );

		return [
			...DomHelper.querySelectorAll( 'table.episodes tr', htmlDocument, false )
		]
			.map(
				( episode ) =>
				{
					return true === episode.classList.contains( 'watched' );
				}
			);
	}

	async toggleWatchState( uri )
	{
		return await this
			.#_ajaxController
			.get( uri, [] );
	}
}
