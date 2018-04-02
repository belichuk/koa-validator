const BaseValidator = require('../helpers/BaseValidator');

class StringValidator extends BaseValidator {
	constructor() {
		super('string');
		this.addRule(
			(value) => typeof value === 'string',
			void 0,
			'The value must be a string',
			true
		);
	}
	
	min(limit) {
		return this.addRule(
			(value, limit) => value.length >= limit,
			[limit],
			'Length cannot be less than ${0}'
		);
	}
	
	max(limit) {
		return this.addRule(
			(value, limit) => value.length <= limit,
			[limit],
			'Length cannot be greater than ${0}'
		);
	}
	
	length(limit) {
		return this.addRule(
			(value , limit) => value.length === limit,
			[limit],
			'Value length is not equal ${0}'
		);
	}
	
	regex(pattern) {
		return this.addRule(
			(value, re) => (Object.prototype.toString.call(re) === '[object RegExp]' && re.test(value)),
			[pattern]
		);
	}
	
	alphanum() {
		return this.addRule(value => /^[A-Za-z0-9]+$/.test(value));
	}
}

module.exports = () => new StringValidator();
