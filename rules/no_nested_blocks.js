var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_nested_blocks';

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_BLOCK') {
            var parent = node.parent;

            while (parent) {
                if (parent.type === 'Condition') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            'Do not put TMPL_BLOCK inside conditionals.',
                            node
                        )
                    );
                }

                if (parent.name === 'TMPL_LOOP' || parent.name === 'TMPL_FOR') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            'Do not put TMPL_BLOCK inside loops.',
                            node
                        )
                    );
                }

                parent = parent.parent;
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
