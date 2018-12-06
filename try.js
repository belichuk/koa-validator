const validate = require('./validate');
const { object, string } = require('./validators');

const schema = object().keys({
    user: string().min(3).max(21),
    password: string().min(6),
    token: string().optional()
});

const errors = validate({user: '@dmin', password: 'qwerty'}, schema, {abortEarly: false});

console.log('errors ->', errors);
// const next = () => {};

/*
let ctx = {
    user: '@dmin',
    password: ''
    // test: 'just a test string'
};
let validate = validator(object().keys({
    // url: string(),
    user: string().min(3).max(21),
    password: string().min(3).max(21),
    token: string().optional()
}), {abortEarly: false});

    // user: string()
    //      .required()
    //      .withMessage('The field "User" cannot be empty')
    //      .custom((min, max, value) => {return min < value && max > value;}, 10, 12)
    //      .withType('range')
    //      .withMessage('cannot be more than ${0} but grate than ${1}')
validate(ctx, next);

console.log('isValid', ctx.isValid);
console.log('errors', ctx.errors);


*/

// compose-validation



const { string, number, object }  = require('@validator');
// const { string, number, object }  = require('./validator');

const rule = string().trim().min(1).max(3);
const rule2 = number()
    .modify(val => val*2) // double
    .custom((val, min, max) => (val >= min && val <= max), 10, 15)
    .withMessage('The value must be between ${0} and ${1}');
    
const result = rule2.validate(5);
// {errors: null, value: 10}

const { errors, value } = await rule.validate(' tx ', options);

rule.validate(' tx ', options)
    .then( value => {console.log(value)})
    .catch( errors => {console.log(errors)});

// const value = rule.value(' tx ', options);


const rule3 = object().keys({
    user: string().trim().min(3).max(21),
    password: string().min(6),
    token: string().optional()
});

const { errors, value } = rule3.validate({user: '@dmin    ', password: 'qwerty'});
// {errors: null, value: {user: '@dmin', password: 'qwerty'}}
// 
// 
const rule = string().trim().min(1).max(3).isValid('ctx');
const rule = string().trim().min(1).max(3).validate('ctx');

const {errors, value} = validate('ctx', string());



const schema = string().min(1).max(3)


{e, v} = await validate('val', schema, options).promise();
// validate('value')
//     .string()
//     .min(1)
    // .promise()
    // .then(value => console.info)
    // .catch(e => console.error);

{true/false} = isValid('val', schema);
validator.validate()