var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_complex_unless';

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_UNLESS') {
            if (node.otherwise !== null) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        'Use of TMPL_ELSE with TMPL_UNLESS is discouraged.',
                        node
                    )
                );
            }

            for (var i = 0; i < node.conditions.length; i += 1) {
                var item = node.conditions[i];

                if (item.condition.type === 'Expression') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            'Use of expressions in TMPL_UNLESS is discouraged.',
                            node
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
