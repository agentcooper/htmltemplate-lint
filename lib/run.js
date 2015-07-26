var C = require('./constants');
var walker = require('./walker');

function run(ast, rules, callback) {
    var _log = [];

    function log(err) {
        if (err.type !== C.RESULT_TYPES.NO_PROBLEMS) {
            _log.push(err);
        }
    }

    walker(ast, undefined, function(node) {
        for (var i = 0, len = rules.length; i < len; i += 1) {
            // @FIXME: do we really need promises here?
            rules[i].run(node, log);
        }
    });

    return callback(_log);
}

module.exports = run;
