var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_mixed_operator_types';

var WORD_OPERATORS = ['or', 'and', 'not'];
var SYMBOLIC_OPERATORS = ['||', '&&', '!'];

var operators = [0, 0];

module.exports = {
    matchExpression: true,

    run: function(node, done, context) {
        if (!context) {
            return done(
                problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
            );
        }

        if (node.type === 'Expression') {
            context.post(function() {
                var isMixing = (operators[0] > 0 && operators[1] > 0);

                operators = [0, 0];

                if (isMixing) {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            'Don\'t mix word and symbolic operators in one expression.',
                            context.node
                        )
                    );
                }

                return done(
                    problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
                );
            });
        } else if (node.operator) {
            if (WORD_OPERATORS.indexOf(node.operator) !== -1) {
                operators[0] += 1;
            } else if (SYMBOLIC_OPERATORS.indexOf(node.operator) !== -1) {
                operators[1] += 1;
            }
        }
    }
};
