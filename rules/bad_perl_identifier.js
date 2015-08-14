var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'bad_perl_identifier';

var perlExpressionParser = require('../lib/perl-expression-parser');

var walker = require('../lib/walker');

module.exports = {
    run: function(node, done) {
        if (node.type === 'Expression') {
            var ast;

            try {
                ast = perlExpressionParser.parse(node.value);
            } catch (e) {
                // @FIXME: fail silently until we are sure it works correctly
            }

            if (!ast) {
                return;
            }

            walker(ast, undefined, function(_node) {
                if (_node.type === 'operand') {
                    if (_node.value.charAt(0) !== '$' && _node.value.charAt(0) !== '@') {
                        if (_node.parent && _node.parent.type === 'call') {
                            return;
                        }

                        return done(
                            problem(
                                RULE_NAME,
                                C.RESULT_TYPES.WARNING,
                                'Bad perl identifier',
                                node
                            )
                        );
                    }
                }
            });
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
