const BaseValidator = require('../helpers/BaseValidator');

class StringValidator extends BaseValidator {
	constructor() {
		super('string');
		this.addRule(
			(value) => typeof value === 'string',
			void 0,
			'The field mast be a string',
			'string',
			true
		);
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
