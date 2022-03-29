'use strict';

Element.prototype.empty = function ()
{
	this.replaceChildren();
};
