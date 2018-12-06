/**
 * 
 * string().max(1).validate('f')''
 * const validate = string().max(N);
 * validate('abc')
 *     .then()
 *     .catch()
 */



// const validator = function(rules, value, options) {
// 	// Do staff 
// }

// const StringValidator = function() {
// 	this.rules = rules || [];

// 	if (!this.rules.length === 0)
// 	{
// 		return StringValidator;
// 	}
// 	// console.log('prototype', StringValidator.prototype);

// 	// return 
// 	// function() {
// 	// 	this.validate();
// 	// }.bind(this);
// };

// StringValidator.prototype.max = function(max) {
	
// 	return validator()
// 	// this.rules.push(max);
// 	// return this;
// };

// StringValidator.prototype.validate = function(value) {
	
// 	return {errors: this.rules};
// };


// const string = () => {
// 	return new StringValidator();
// };




// let validator = string().max(5);
// let validate = string().max(2);


// console.log('validator', validator.validate('10'));
// console.log('validator', validate('100'));





const string = () => {
	// first rule for string
	// 
	const rules = [];
	const isString = (s) => typeof s === 'string';
	const validate = function() {
		return function(val) { console.log('rules', rules) };
	};
	
	const Validator = function(val) {
		// threre is rules []
		// return isString(val);
		// 
		return Validator;
	};
	
	Validator.prototype.max = (max) => {
		console.log('max', max);
		
		return new Validator(); 
	};
	
	for (let proto in Validator.prototype) {
		if (Validator.prototype.hasOwnProperty('max')) {
			console.log('proto', proto);
			validate.prototype[proto] = Validator.prototype[proto];
		}
	}
	
	return new Validator();
	//new Validator();
};


let validate = string();

// let maxValidator = validate.max(2);

console.log('validate', validate(10));
