const Rule = require('./ValidationRule');

class BaseValidator {
	constructor(type = 'base') {
		this.type = type;
		this.rules = new Set();
	}
	
	addRule(fn, args, msg, type) {
		const rule = new Rule(fn, args, msg, type);
		
		this.rules.add(rule);
		
		return this;
	}
	
	custom(fn, ...args) {
		this.addRule(fn, args, '', '');
		
		return this;
	}
	
	withType(type) {
		let lastRule = Array.from(this.rules).pop();
		
		lastRule && lastRule.setType(type);
		
		return this;
	}
	
	withMessage(msg) {
		let lastRule = Array.from(this.rules).pop();
		
		lastRule && lastRule.setErrorMsg(msg);
		
		return this;
	}
	
	getType() {
		return this.type;
	}

	getRules() {
		return this.rules.values();
	}	
		
	required() {
		this.custom(value => typeof value !== void 0)
			.withType('required')
			.withMessage('The field is required');
		
		return this;
	}
};

module.exports = BaseValidator;
