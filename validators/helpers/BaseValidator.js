const Rule = require('./ValidationRule');

class BaseValidator {
	constructor(type = 'base') {
		this.setType(type)
			.optional()
			.init();
	}
	
	init() {
		this.rules = new Set();
		
		this.addRule(
			value => this.isMandatory ? typeof value !== 'undefined' : true,
			[],
			'The field is required',
			'required',
			true
		);
		
		return this;
	}
	
	addRule(fn, args, msg, type = 'custom', abort = false) {
		const rule = new Rule(fn, args)
			.setErrorMsg(msg)
			.setType(type)
			.abortOnError(abort);
		
		this.rules.add(rule);
		
		return this;
	}
	
	optional() {
		this.isMandatory = false;
		
		return this;
	}
	
	required() {
		this.isMandatory = true;
		
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
	
	setType(type) {
		this.type = type;
		
		return this;
	}
	
	getType() {
		return this.type;
	}

	getRules() {
		return this.rules.values();
	}	
};

module.exports = BaseValidator;
