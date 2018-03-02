const BaseValidator = require('../helpers/BaseValidator');

class StringValidator extends BaseValidator {
	constructor(length) {
		super('string');
		this.addRule((value) => {
			return typeof value === 'string';
		});
	}
	
	min(limit) {
		return this.addRule(
			(limit, value) => value.length >= limit,
			[limit],
			'Cannot be more than ${0}',
			'min'
		);
	}
	
	max(limit) {
		return this.addRule(
			(limit, value) => value.length <= limit,
			[limit],
			'Cannot be grate than ${0}',
			'max'
		);
	}
}

module.exports = () => new StringValidator();
