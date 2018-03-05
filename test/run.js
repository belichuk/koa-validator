const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
	"spec_dir": "test",
	"spec_files": [
		"*\.[tT]est.js"
	],
	"helpers": ["../node_modules/jasmine-expect/index.js"],
	"stopSpecOnExpectationFailure": false,
	"random": false
});

jasmine.execute();
