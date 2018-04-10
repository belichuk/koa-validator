# Koa validator

Validation library for koa framework.

[![CircleCI](https://circleci.com/gh/belichuk/koa-validator/tree/master.svg?style=shield&circle-token=15749c4d720644479936ed793d757fdb6e14dac9)](https://circleci.com/gh/belichuk/koa-validator/tree/master)

# Example

```javascript
const validate = require('./validate');
const { object, string } = require('./validators');

const schema = object().keys({
    user: string().min(8).max(21),
    password: string().min(8),
    token: string().optional()
});

const errors = validate({user: '@dmin', password: 'qwerty'}, schema, {abortEarly: false});

console.log('errors ->', errors);
// errors -> []
```