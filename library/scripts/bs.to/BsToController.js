'use strict';

class BsToController
{
	constructor()
	{
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
											DomHelper.createElementsFromString( htmlResponseData )
										);
									}
								)
						}
					)
			}
		);
	}
}
