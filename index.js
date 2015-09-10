var C = require('./lib/constants');

var parser = require('htmltemplate-parser');
var run = require('./lib/run');
var rules = require('./rules');
var problem = require('./lib/problem');

var BIG_FILE_THRESHOLD = 50 * 1024;

module.exports = function(tmpl, callback) {
    try {
        run(
            parser.parse(
                tmpl,
                {
                    reducePositionLookups: tmpl.length > BIG_FILE_THRESHOLD,
                    ignoreHTMLTags: true
                }
            ),
            rules,
            callback
        );
    } catch(e) {
        // Returning array for consistency with rules runner.
        var location;

        if (e.location) {
            location = {
                line: e.location.start.line,
                column: e.location.start.column
            };
        } else {
            location = {
                line: e.line,
                column: e.column
            };
        }

        callback([
            problem(
                'parse_error',
                C.RESULT_TYPES.ERROR,
                e.message,
                {
                    position: location
                }
            )
        ]);
    }
};
