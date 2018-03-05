const validate = require('./validate');

module.exports = (schema, options) => (ctx, next) => {
	let errors = validate(ctx, schema, options);
	
	ctx.isValid = !errors.length;
	ctx.errors = errors;
	
	return next();
};
