'use strict';

const Number = function(number){
	this.value = number;
	this.valid = number.match(/^\d+$/);
}

Number.prototype.add = function(number){
	if (this.valid )
	return this.value + number;
}

export default Number;