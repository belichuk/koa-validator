const BaseValidator = require('../helpers/BaseValidator');

class ObjectValidator extends BaseValidator {
	constructor() {
		super('object');
		this.addRule(
			(value) => typeof value === 'object' && !!value,
			void 0,
			'The value must be a object',
			true
		);
	}

}

module.exports = () => new ObjectValidator();
