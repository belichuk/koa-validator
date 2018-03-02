class ValidationError {
	constructor(message, _props) {
		let props = Object.assign({}, _props);

		this.message = message || 'Unspecified validation error';
		
		// copy from argument properties
		for (let key in props) {
		  this[key] = props[key];
		}
	}
	
	toJSON() {
		let {args, message, type, value, field} = this;
		
		return {args, message, type, value, field};
	}
}

module.exports = ValidationError;
