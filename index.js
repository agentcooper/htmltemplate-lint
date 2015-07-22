var parser = require('htmltemplate-parser');

var C = require('./lib/constants');

var run = require('./run');
var rules = require('./rules');
var problem = require('./lib/problem');

module.exports = function(tmpl, callback) {
    try {
        run(
            parser.parse(tmpl),
            rules,
            callback
        );
    } catch(e) {
        // Returning array for consistency with rules runner.
        callback([
            problem(
                'parse_error',
                C.RESULT_TYPES.ERROR,
                e.message,
                {
                    line: e.line,
                    column: e.column
                }
            )
        ]);
    }
};
