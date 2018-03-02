function isObject(obj) {
	return typeof obj === 'object' && !!obj;
};

/**
 * The cornerstone, an `each` implementation, aka `forEach`.
 * Handles raw objects in addition to array-likes.
 * @param  {Array|Object} obj       Iterable object or array.
 * @param  {Function}     fn        Function to execute for each element.
 *                                  taking three arguments: currentValue, index, iterable object.
 * @param  {Object}       [context] The callback context.
 * @return {undefined}
 */
module.exports.each = function(obj, fn, context) {
	if (Array.isArray(obj)) {
		for (let i = 0, len = obj.length; i < len; ++i) {
			if (fn.call(context || this, obj[i], i, obj) === false) {
				break;
			}
		}
	} else if (isObject(obj)) {
		let keys = Object.keys(obj);
		for (let i = 0, len = keys.length; i < len; ++i) {
			if (fn.call(context || this, obj[keys[i]], keys[i], obj) === false) {
				break;
			}
		}
	}
};

module.exports.isObject = isObject;
