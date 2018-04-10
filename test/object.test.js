const validate = require('../validate');
const { string, object } = require('../validators');
const next = () => {};

describe('Object validation:', () => {
	let options = {abortEarly: false, allowUnknown: false};
	
	it('It should be no errors in case of valid object', () => {
		let errors = validate({ctx: {user: 'admin'}}, {ctx: object()}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(0);
	});
	
	it('It should be an error when keys number mismatch', () => {
		let value = {
			user: 'admin',
			password: '123',
			data: 'data'
		};
		let shema = object().keys({
			user: string(),
			password: string()
		});
		let errors = validate(value, shema, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
	});
	it('It should be an error of non object validation', () => {
		let errors = validate({ctx: null}, {ctx: object()}, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(1);
		expect(errors[0].field).toBe('ctx');
		expect(errors[0].value).toBe(null);
	});
	
	it('It should be no errors in case on valid object keys', () => {
		let shema = object().keys({
			user: string(),
			password: string()
		});
		let errors = validate({user: 'admin', password: '123'}, shema, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(0);
	});
	
	it('It should be no errors in case on valid object with valid child object', () => {
		let shema = object().keys({
			user: string(),
			password: string(),
			data: object().keys({
				date: string(),
				token: string().min(5)
			})
		});
		let value = {
			user: 'admin',
			password: '123',
			data: {date: '2018-04-06', token: 'xa1xz2'}
		};
		let errors = validate(value, shema, options);
		
		expect(errors).toBeArray();
		expect(errors.length).toBe(0);
	});
	
	it('It should be errors in case on valid object but invalid child object', () => {
		let shema = object().keys({
			user: string(),
			password: string(),
			data: object().keys({
				date: string(),
				token: string().min(5)
			})
		});
		let token = 'xa1';
		let value = {
			user: 'admin',
			password: '123',
			data: {token: token}
		};
		let errors = validate(value, shema, options);

		expect(errors).toBeArray();
		expect(errors.length).toBe(2);
		expect(errors[0].field).toBe('date');
		expect(errors[0].value).toBeUndefined();
		expect(errors[1].field).toBe('token');
		expect(errors[1].value).toBe(token);
	});
});
