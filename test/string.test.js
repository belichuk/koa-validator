const validate = require('../validate');
const { string } = require('../validators');
const next = () => {};

describe('String validation:', () => {
	let options = {abortEarly: false};
	
	it('It should be no error if field is optional ', () => {
		let errors = validate({}, {user: string().optional()}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(0);
		// expect(errors[0].field).toBe('user');
		// expect(errors[0].value).toBe(void(0));
	});
	
	it('It should be an error if string field is not set', () => {
		let errors = validate({}, {user: string()}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].value).toBe(void(0));
	});
	
	it('It should be invalid for non string types', () => {
		let notStringPrimitive = [void(0), null, true, 10, {}];

		notStringPrimitive.forEach((primitive) =>{
			let errors = validate({user: primitive}, {user: string()}, options);
			
			expect(errors).toBeArray();
			expect(errors.length).toBe(1);
			expect(errors[0].field).toBe('user');
			expect(errors[0].value).toBe(primitive);
		});
	});
	
	it('It should be invalid when minimum string length', () => {
		let errors = validate({user: 'guest'}, {user: string().min(10)}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].value).toBe('guest');
	});
	
	it('It should be valid when minimum string length', () => {
		let userName = 'guest';
		
		for (let i = 0, len = userName.length; i <= len; i++) {
			let errors = validate({user: 'guest'}, {user: string().min(i)}, options);
			
			expect(errors).toBeArray();
			expect(errors.length).toBe(0);
		}
	});
	
	it('It should be invalid when maximum string length', () => {
		let errors = validate({user: 'guest'}, {user: string().min(10)}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].value).toBe('guest');
	});
	
	it('It should be valid when minimum string length', () => {
		let userName = 'guest';
		
		for (let i = 0, len = userName.length; i <= len; i++) {
			let errors = validate({user: 'guest'}, {user: string().min(i)}, options);
			
			expect(errors).toBeArray();
			expect(errors.length).toBe(0);
		}
	});
	
	it('It should be invalid when string field is not set but long validation', () => {
		debugger;
		let errors = validate({fake: 'test'}, {uid: string().min(3).max(10)}, options);
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('uid');
		expect(errors[0].value).toBe(void(0));
	});
	
	it('It should be valid if the length of the string matches', () => {
		let errors = validate({user: 'guest'}, {user: string().length(5)}, options);
		
		expect(errors.length).toBe(0);
	});
	
	it('It should be invalid if the length of the string does not match', () => {
		[1,2,3,4,/* no 5 */, 6,7,8,9].forEach((len) => {
			let errors = validate({user: 'guest'}, {user: string().length(len)}, options);
			
			expect(errors.length).toBe(1);
			expect(errors[0].field).toBe('user');
			expect(errors[0].value).toBe('guest');
			expect(errors[0].args[0]).toBe(len);
		});
	});
	
	it('It should be correct message with params', () => {
		let min = 3;
		let max = 10;
		let schema = {
			user: string()
					.custom((value, min, max) => value.length > min && value.length < max, min, max)
					.withMessage('The field length must be greater ${0} and less than ${1}')
		};
		let errors = validate({user: 'administrator'}, schema, options);

		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].value).toBe('administrator');
		expect(errors[0].message).toBe(`The field length must be greater ${min} and less than ${max}`);
	});
	
	it('It should be a valid verification of regex', () => {
		let httpUrl = 'http://github.com';
		let falseErrors = validate({url: httpUrl}, {url: string().regex(/^http:\/\//)}, options);
		let trueErrors = validate({url: httpUrl}, {url: string().regex(/^https:\/\//)}, options);
		let badRegexErrors = validate({url: httpUrl}, {url: string().regex('^https:\/\/')}, options);
		let goodRegexErrors = validate({url: httpUrl}, {url: string().regex(new RegExp('^http://'))}, options);

		expect(falseErrors.length).toBe(0);
		
		expect(trueErrors.length).toBe(1);
		expect(trueErrors[0].field).toBe('url');
		expect(trueErrors[0].value).toBe(httpUrl);
		
		expect(badRegexErrors.length).toBe(1);
		expect(badRegexErrors[0].field).toBe('url');
		expect(badRegexErrors[0].value).toBe(httpUrl);
		
		expect(goodRegexErrors.length).toBe(0);
	});
	
	it('It should be a valid verification of alphanum', () => {
		let trueErrors = validate({
			user: '@dmin',
			user2: 'admin!',
			party: '5.10',
			empty: ''
		},
		{
			user: string().alphanum(),
			user2: string().alphanum(),
			party: string().alphanum(),
			empty: string().alphanum()
		},
			options
		);
		
		let falseErrors = validate({user: 'admin123'}, {user: string().alphanum()}, options);
		
		expect(falseErrors.length).toBe(0);
		
		expect(trueErrors.length).toBe(4);
		expect(trueErrors[0].field).toBe('user');
		expect(trueErrors[0].value).toBe('@dmin');
		expect(trueErrors[1].field).toBe('user2');
		expect(trueErrors[1].value).toBe('admin!');
		expect(trueErrors[2].field).toBe('party');
		expect(trueErrors[2].value).toBe('5.10');
		expect(trueErrors[3].field).toBe('empty');
		expect(trueErrors[3].value).toBe('');
	});
});
