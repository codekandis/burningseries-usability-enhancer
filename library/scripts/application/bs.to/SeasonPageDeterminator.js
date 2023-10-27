'use strict';

class SeasonPageDeterminator extends BaseClass
{
	#_patterns = [
		/^https:\/\/bs\.to\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/bs\.to\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/bs\.to\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.co\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.co\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.co\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.sx\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.sx\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.sx\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.ac\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.ac\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.ac\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.vc\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.vc\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.vc\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.cx\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.cx\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.cx\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.nz\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.nz\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.nz\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
		/^https:\/\/burningseries\.se\/serie\/[0-9a-z\-]+\/?$/i,
		/^https:\/\/burningseries\.se\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
		/^https:\/\/burningseries\.se\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i
	];
	#_uri;

	constructor( uri )
	{
		super();

		this.#_uri = uri;
	}

	get isSeasonPage()
	{
		return this.#_patterns.some(
			( regularExpression ) =>
			{
				return regularExpression.test( this.#_uri );
			}
		);
	}
}
