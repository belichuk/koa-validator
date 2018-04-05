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
});
