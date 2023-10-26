'use strict';

class BsToController extends BaseClass
{
	constructor()
	{
		super();

		this._ajaxController = new AjaxController();
	}

	async readEpisodes( uri )
	{
		const htmlString = await (
			await this
				._ajaxController
				.get( uri, [] )
		)
			.text();

		return [
			...DomHelper.querySelectorAll(
				'table.episodes tbody tr td:nth-child( 1 ) a',
				( new DOMParser() )
					.parseFromString( htmlString, ContentTypes.TEXT_HTML ),
				false
			)
		];
	}

	async readWatchStates( uri )
	{
		const htmlString = await (
			await this
				._ajaxController
				.get( uri, [] )
		)
			.text();

		return [
			...DomHelper.querySelectorAll(
				'table.episodes tr',
				( new DOMParser() )
					.parseFromString( htmlString, ContentTypes.TEXT_HTML ),
				false
			)
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
			._ajaxController
			.get( uri, [] );
	}
}
