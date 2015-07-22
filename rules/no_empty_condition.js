var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_empty_condition';
var WARNING_MESSAGE = 'Leaving empty condition blocks is discouraged.';

module.exports = {
    run: function(node, done) {
        if (node.type === 'Condition' && (node.otherwise || node.conditions.length > 1)) {
            if (node.otherwise && hasEmptyContent(node.otherwise.content)) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        WARNING_MESSAGE,
                        node.position
                    )
                );
            }

            for (var i = 0; i < node.conditions.length; i += 1) {
                if (hasEmptyContent(node.conditions[i].content)) {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            WARNING_MESSAGE,
                            node.position
                        )
                    );
                }
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function hasEmptyContent(content) {
    return content
        .filter(function(node) {
            return !(
                node.type === 'Text' &&
                node.content.match(/^\s+$/g)
            );
        })
        .length === 0;
}
