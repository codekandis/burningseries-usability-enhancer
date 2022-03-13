'use strict';

class SeasonPageDeterminator
{
	constructor( uri )
	{
		this._patterns = [
			/^https:\/\/bs\.to\/serie\/[0-9a-z\-]+\/?$/i,
			/^https:\/\/bs\.to\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
			/^https:\/\/bs\.to\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i,
			/^https:\/\/burningseries\.co\/serie\/[0-9a-z\-]+\/?$/i,
			/^https:\/\/burningseries\.co\/serie\/[0-9a-z\-]+\/\d+\/?$/i,
			/^https:\/\/burningseries\.co\/serie\/[0-9a-z\-]+\/\d+\/[a-z]+\/?$/i
		];
		this._uri      = uri;
	}

	get _isSeasonPage()
	{
		return this._patterns.some(
			( regularExpression ) =>
			{
				return regularExpression.test( window.location.href );
			}
		);
	}
}
