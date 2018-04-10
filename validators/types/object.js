const utils = require('../../utils/object');
const Err = require('../helpers/ValidationError');
const BaseValidator = require('./base');

class ObjectValidator extends BaseValidator {
	constructor(rules) {
		super('object');
		this.addRule(
			value => typeof value === 'object' && !!value,
			void 0,
			'The value must be an object',
			true
		);
		
		this.childRules = Object.assign({}, rules);
	}
	
	keys(rules) {
		this.childRules = Object.assign(this.childRules, rules);
		
		return this;
	}
	
	validate(ctx, options, field = null) {
		const { childRules } = this;
		
		if (options.allowUnknown === false && !field) {
			const ctxKeys = Object.keys(ctx);
			const childKeys = Object.keys(childRules);
			const diff = ctxKeys.filter(item => !~childKeys.indexOf(item));
			
			if (diff.length > 0) {
				return [new Err('${0} is not allowed', {
					args: [diff.map(i => `"${i}"`).join(', ')],
					value: ctx,
					field: field || '_root'
				})];
			}
		}
		
		let errors = super.validate(ctx, options, field);
		
		if (!errors.length) {
			utils.each(childRules, (schema, key) => {
				let schemaErrors = schema.validate(ctx && ctx[key], options, key)
				
				errors = errors.concat(schemaErrors);
			});
		}
		
		return errors;
	}

}

module.exports = ObjectValidator;
