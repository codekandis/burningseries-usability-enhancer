'use strict';

class MenuReorderer
{
	constructor( orderPresets )
	{
		this._orderPresets = orderPresets;
	}

	reorder()
	{
		this._orderPresets.forEach(
			( orderPreset ) =>
			{
				DomHelper.insert(
					document.querySelector( orderPreset.targetSelector ),
					document.querySelector( orderPreset.selector ),
					orderPreset.position
				)
			}
		);
	}
}
