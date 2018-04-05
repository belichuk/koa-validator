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
		const { callback, args } = this;
		
		if (typeof callback !== 'function') {
			return false;
		}
		
		return callback.apply(null, [].concat(value, args));
	}
}

module.exports = Rule;
