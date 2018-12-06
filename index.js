// const validate = require('./validate');

// module.exports = (schema, options) => (ctx, next) => {
// 	let errors = validate(ctx, schema, options);
	
// 	ctx.isValid = !errors.length;
// 	ctx.errors = errors;
	
// 	return next();
// };
const string = require('./validators/types/string');
const object = require('./validators/types/object');

module.exports = {
	string: () => new StringValidator(),
	object: rules => new ObjectValidator(rules)
};