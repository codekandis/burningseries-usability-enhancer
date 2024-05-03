'use strict';

class MenuAdder extends BaseClass
{
	#_presets;

	constructor( presets )
	{
		super();

		this.#_presets = presets;
	}

	async addMenuAsync()
	{
		this.#_presets.forEach(
			( preset ) =>
			{
				DomHelper.insert(
					DomHelper.querySelector( preset.targetSelector, document ),
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
