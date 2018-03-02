class Rule {
	constructor(fn, args = [], msg = '', type = 'custom') {
		this.callback = fn;
		this.setArgs(args)
			.setType(type)
			.setErrorMsg(msg);
	}
	
	setType(type) {
		this.type = type;
		return this;
	}
	
	setArgs(args) {
		this.args = args;
		return this;
	}
	
	setErrorMsg(msg) {
		this.errorMsg = msg;
		return this;
	}
	
	validate(value) {
		let validator = this.callback;
		
		if (typeof validator !== 'function') {
			return false;
		}
		
		let args = this.args.concat(value);
		
		return validator.apply(validator, args);
	}
}

module.exports = Rule;
