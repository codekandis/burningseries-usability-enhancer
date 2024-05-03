'use strict';

class BsToController extends BaseClass
{
	#_ajaxController = new AjaxController();

	constructor()
	{
		super();
	}

	async #readAsHtmlDocumentAsync( uri )
	{
		const htmlString = await (
			await this.#_ajaxController.getAsync( uri, [] )
		)
			.text();

		return ( new DOMParser() )
			.parseFromString( htmlString, ContentTypes.TEXT_HTML );
	}

	async readSeriesAllAsync( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocumentAsync( uri );

		return [
			...DomHelper.querySelectorAll( '#seriesContainer .genre > ul > li a', htmlDocument, false )
		]
			.map(
				( series ) =>
				{
					return {
						"name": series.textContent.toLowerCase(),
						"uri":  series.href
					};
				}
			);
	}

	async readEpisodesAsync( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocumentAsync( uri );

		return [
			...DomHelper.querySelectorAll( 'table.episodes tbody tr td:nth-child( 1 ) a', htmlDocument, false )
		];
	}

	async readWatchStatesAsync( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocumentAsync( uri );

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

	async readSeriesAbstractAsync( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocumentAsync( uri );

		return {
			description: DomHelper.querySelector( '#sp_left p', htmlDocument, false ).textContent,
			image:       DomHelper.querySelector( '#sp_right img', htmlDocument, false ).src
		};
	}

	async toggleWatchStateAsync( uri )
	{
		return await this.#_ajaxController.getAsync( uri, [] );
	}
}
