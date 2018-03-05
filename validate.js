const utils = require('./utils/object');
const Err = require('./validators/helpers/ValidationError');
const BaseValidator = require('./validators/helpers/BaseValidator');

module.exports = (ctx, schema, options = {}) => {
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
					
					// early exit in case of an breakable error
					if (rule.abort) {
						return false;
					}
				}
				
				iterator = rules.next();
			}
		}
		
		// false - to early exit in case when found an error
		return !(options.abortEarly && !!errors.length);
	});
	
	return errors;
};
