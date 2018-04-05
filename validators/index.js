const BaseValidator = require('./types/base');
const StringValidator = require('./types/string');
const ObjectValidator = require('./types/object');

module.exports = {
	base: () => new BaseValidator(),
	string: () => new StringValidator(),
	object: rules => new ObjectValidator(rules)
};
