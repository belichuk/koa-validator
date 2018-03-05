const validate = require('../validate');
const { string } = require('../validators');
const next = () => {};

describe('Initialize', () => {
	let options = {abortEarly: false};
	
	it('It should be an error if mandatory field is not set', () => {
		let errors = validate({}, {user: string().required()}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].type).toBe('required');
		expect(errors[0].value).toBe(void(0));
	});
	
	it('It should be an error if string field is not set', () => {
		let errors = validate({}, {user: string()}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].type).toBe('string');
		expect(errors[0].value).toBe(void(0));
	});
	
	it('It should be invalid for non string types', () => {
		let notStringPrimitive = [void(0), null, true, 10, {}];

		notStringPrimitive.forEach((primitive) =>{
			let errors = validate({user: primitive}, {user: string()}, options);
			
			expect(errors).toBeArray();
			expect(errors.length).toBe(1);
			expect(errors[0].field).toBe('user');
			expect(errors[0].type).toBe('string');
			expect(errors[0].value).toBe(primitive);
		});
	});
	
	it('It should be invalid when minimum string length', () => {
		let errors = validate({user: 'guest'}, {user: string().min(10)}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('user');
		expect(errors[0].type).toBe('min');
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
		expect(errors[0].type).toBe('min');
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
		let errors = validate({fake: 'test'}, {uid: string().min(3).max(10)}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].type).toBe('string');
		expect(errors[0].field).toBe('uid');
		expect(errors[0].value).toBe(void(0));
	});
	
});
