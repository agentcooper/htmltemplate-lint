var parser = require('htmltemplate-parser');

var C = require('./lib/constants');

var run = require('./run');
var rules = require('./rules');
var problem = require('./lib/problem');

var BIG_FILE_THRESHOLD = 50 * 1024;

module.exports = function(tmpl, callback) {
    try {
        run(
            parser.parse(
                tmpl,
                {
                    reducePositionLookups: tmpl.length > BIG_FILE_THRESHOLD
                }
            ),
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
                    position: {
                        line: e.line,
                        column: e.column
                    }
                }
            )
        ]);
    }
};
