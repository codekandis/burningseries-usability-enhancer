'use strict';

class MenuAdder extends BaseClass
{
	constructor( presets )
	{
		super();

		this._presets = presets;
	}

	add()
	{
		this._presets.forEach(
			( preset ) =>
			{
				DomHelper.insert(
					document.querySelector( preset.targetSelector ),
					DomHelper.createElementFromString(
						String.format`<li><a>${ 0 }</a><ul></ul></li>`( preset.name ),
						null,
						null,
						preset.dataAttributes
					),
					preset.position
				)
			}
		);
	}
}
