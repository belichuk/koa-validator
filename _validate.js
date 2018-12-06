const utils = require('./utils/object');
const BaseValidator = require('./validators/types/base');
const { object } = require('./validators');

module.exports = (ctx, schema, options = {}) => {
	if (schema instanceof BaseValidator) {
		return schema.validate(ctx, options);
	} 
	
	if (utils.isObject(schema)) {
		return object(schema).validate(ctx, options);
	}
	
	return [];
};
