'use strict';

const utils = require('./utils/object');
const Err = require('./validators/helpers/ValidationError');
const BaseValidator = require('./validators/helpers/BaseValidator');

function validateSchema(ctx, schema, options = {}) {
	var errors = [];
	
	utils.each(schema, (model, key) => {
		if (model instanceof BaseValidator) {
			
			let rules = model.getRules();
			let iterator = rules.next();
			
			while (!(options.abortEarly && !!errors.length) && !iterator.done) {
				let rule = iterator.value;
				
				if (!rule.validate(ctx[key])) {
					let error = new Err(rule.errorMsg, {
						args: rule.args,
						type: rule.type,
						value: ctx[key],
						field: key
					});
					
					errors.push(error);
				}
				
				iterator = rules.next();
			}
		}
		
		// false - to early exit in case when found an error
		return !(options.abortEarly && !!errors.length);
	});
	return errors;
}

module.exports = (schema, options) => (ctx, next) => {
	let schemaErrors = validateSchema(ctx, schema, options);
	
	ctx.isValid = !schemaErrors.length;
	ctx.errors = schemaErrors;
	
	return next();
};
