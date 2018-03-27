class Rule {
	constructor(fn, args = [], msg = '', abort = false) {
		this.callback = fn;
		this.setArgs(args)
			.setErrorMsg(msg)
			.abortOnError(abort);
	}
	
	setArgs(args) {
		this.args = args;
		return this;
	}
	
	setErrorMsg(msg) {
		this.errorMsg = msg;
		return this;
	}
	
	abortOnError(abort = false) {
		this.abort = abort;
		
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
