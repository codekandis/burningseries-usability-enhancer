class SettingsData
{
	constructor()
	{
		this.apiBaseUri = 'https://api.burningseries-usability-enhancer.codekandis.net';
		this.apiUserId  = '';
		this.apiKey     = '';
	}

	get permissions()
	{
		return {
			permissions: [],
			origins:     []
		}
	}
}
