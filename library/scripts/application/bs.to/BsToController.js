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
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._ajaxController
					.get( uri, [] )
					.then(
						( response ) =>
						{
							response
								.text()
								.then(
									( htmlString ) =>
									{
										resolveHandler(
											[
												...DomHelper.querySelectorAll(
													'table.episodes tbody tr td:nth-child( 1 ) a',
													( new DOMParser() )
														.parseFromString( htmlString, ContentTypes.TEXT_HTML ),
													false
												)
											]
										);
									}
								)
						}
					)
			}
		);
	}

	async readWatchStates( uri )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._ajaxController
					.get( uri, [] )
					.then(
						( response ) =>
						{
							response
								.text()
								.then(
									( htmlString ) =>
									{
										resolveHandler(
											[
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
												)
										);
									}
								)
						}
					)
			}
		);
	}

	async toggleWatchState( uri )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._ajaxController
					.get( uri, [] )
					.then(
						( response ) =>
						{
							resolveHandler();
						}
					)
			}
		);
	}
}
