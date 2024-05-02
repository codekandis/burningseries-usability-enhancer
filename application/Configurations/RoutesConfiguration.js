'use strict';

class RoutesConfiguration extends AbstractRoutesConfiguration
{
	__routes = {
		'/':                LandingPageApplicationPage,
		'/andere-serien':   AllSeriesApplicationPage,
		'/serie/.*':        SeriesApplicationPage,
		'/settings/series': SeriesSettingsApplicationPage
	};
}
