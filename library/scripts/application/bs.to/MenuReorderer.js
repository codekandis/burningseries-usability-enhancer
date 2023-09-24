'use strict';

class MenuReorderer extends BaseClass
{
	constructor( orderPresets )
	{
		super();

		this._orderPresets = orderPresets;
	}

	reorder()
	{
		this._orderPresets.forEach(
			( orderPreset ) =>
			{
				DomHelper.insert(
					DomHelper.querySelector( orderPreset.targetSelector, document ),
					DomHelper.querySelector( orderPreset.selector, document ),
					orderPreset.position
				)
			}
		);
	}
}
