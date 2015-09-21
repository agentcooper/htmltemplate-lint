var C = require('./constants');
var walker = require('./walker');

function run(ast, rules, callback) {
    var _log = [];

    function log(err) {
        if (err.type !== C.RESULT_TYPES.NO_PROBLEMS) {
            _log.push(err);
        }
    }

    walker(ast, undefined, function(node, expressionContext) {
        var rule;

        for (var i = 0, len = rules.length; i < len; i += 1) {
            rule = rules[i];

            // `expressionContext` is present while traversing through an
            // expression.
            if (expressionContext) {
                if (rule.matchExpression) {
                    rule.run(node, log, expressionContext);
                }
            } else {
                rule.run(node, log);
            }
        }
    });

    return callback(_log);
}

module.exports = run;
