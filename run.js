var walker = require('./walker');

function run(ast, rules, callback) {
    var _log = [];

    function log(err) {
        if (err) {
            _log.push(err);
        }
    }

    walker(ast, undefined, function(node) {
        // @FIXME: should rules be an array instead?
        for (rule in rules) {
            // @FIXME: do we really need promises here?
            rules[rule].run(node, log);
        }
    });

    return callback(_log);
}

module.exports = run;
