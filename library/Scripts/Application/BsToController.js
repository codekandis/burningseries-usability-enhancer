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

	async readNewestEpisodesAsync( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocumentAsync( uri );

		return DomHelper.querySelector( '#newest_episodes', htmlDocument, false );
	}

	async readNewestSeriesAsync( uri )
	{
		const htmlDocument = await this.#readAsHtmlDocumentAsync( uri );

		return DomHelper.querySelector( '#newest_series', htmlDocument, false );
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
		const genres       = [
			...DomHelper.querySelectorAll( '#sp_left .infos div:nth-child(1) p span', htmlDocument, false )
		]
			.map(
				( genre ) =>
				{
					return genre.textContent;
				}
			)
			.join( ' ' );

		return {
			image:       DomHelper.querySelector( '#sp_right img', htmlDocument ).src,
			genres:      genres,
			releaseTime: DomHelper.querySelector( '#sp_left .infos div:nth-child(2) p em', htmlDocument ).textContent,
			description: DomHelper.querySelector( '#sp_left p', htmlDocument ).textContent
		};
	}

	async toggleWatchStateAsync( uri )
	{
		return await this.#_ajaxController.getAsync( uri, [] );
	}
}
