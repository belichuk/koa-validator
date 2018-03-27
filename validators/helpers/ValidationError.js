class ValidationError {
	constructor(message = '', _props) {
		const props = Object.assign({}, _props);
		const args = (Array.isArray(props.args) && props.args) || [];
		
		this.message = message.replace(/\$\{([0-9]+)\}/g, (str, val) => {
			return (typeof args[val] !== 'undefined') ? args[val] : '';
		});
		
		// copy from argument properties
		for (let key in props) {
		  this[key] = props[key];
		}
	}
	
	toJSON() {
		let {args, message, value, field} = this;
		
		return {args, message, value, field};
	}
}

module.exports = ValidationError;
