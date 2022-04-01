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
						( responseData ) =>
						{
							responseData
								.text()
								.then(
									( htmlResponseData ) =>
									{
										resolveHandler(
											( new DOMParser() )
												.parseFromString( htmlResponseData, 'text/html' )
												.querySelectorAll( 'table.episodes tbody tr td:nth-child( 1 ) a' )
										);
									}
								)
						}
					)
			}
		);
	}
}
