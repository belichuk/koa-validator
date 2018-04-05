const Rule = require('./ValidationRule');
const Err = require('./ValidationError');

class BaseValidator {
	constructor(type = 'base') {
		this.setType(type)
			.required()
			.init();
	}
	
	init() {
		this.rules = new Set();
		
		this.addRule(
			value => this.isMandatory ? typeof value !== 'undefined' : true,
			[],
			'The field is required',
			true
		);
		
		return this;
	}
	
	addRule(fn, args, msg, abort = false) {
		const rule = new Rule(fn, args)
			.setErrorMsg(msg)
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
	
	validate(value, options, field = null) {
		let errors = [];
		let [ ...rules ] = this.getRules();
		
		if (!this.isMandatory && typeof value === 'undefined') {
			// no need to validate if value not passed and validation is optional
			return [];
		}
		
		for (let i = 0, len = rules.length; i < len; i++) {
			if (!rules[i].validate(value)) {
				errors.push(new Err(rules[i].errorMsg, {
					args: rules[i].args,
					value: value,
					field: field || '_root'
				}));
				
				// early exit in case of an breakable error
				if (options.abortEarly || rules[i].abortOnError) {
					return errors;
				}
			}
		}

		return errors;
	}
};

module.exports = BaseValidator;
