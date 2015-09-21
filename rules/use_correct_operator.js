var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'use_correct_operator';

var OPERATOR_MAP = {
    'eq': '==',
    'ne': '!=',
    '==': 'eq',
    '!=': 'ne'
};

var isStringLiteral = isLiteral.bind(null, 'string');
var isNumberLiteral = isLiteral.bind(null, 'number');

var _root;

module.exports = {
    matchExpression: true,

    run: function(node, done, context) {
        if (!context) {
            return done(
                problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
            );
        }

        if (context.isRoot) {
            // FIXME: Finding root expression node should be simpler. Or parser
            // should be changed to provide positions for expression tokens.
            _root = node;
        }

        if (node.type === 'BinaryExpression') {
            var isStringComparisonOperator = (
                node.operator === 'eq' ||
                node.operator === 'ne'
            );

            var isNumberComparisonOperator = (
                node.operator === '==' ||
                node.operator === '!='
            );

            var isUsingStringComparisonWrong = (
                isStringComparisonOperator &&
                (
                    isNumberLiteral(node.left) ||
                    isNumberLiteral(node.right)
                )
            );

            var isUsingNumberComparisonWrong = (
                isNumberComparisonOperator &&
                (
                    isStringLiteral(node.left) ||
                    isStringLiteral(node.right)
                )
            );

            if (isUsingStringComparisonWrong) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.ERROR,
                        'Use ' + OPERATOR_MAP[node.operator] + ' operator to compare numbers.',
                        _root
                    )
                );
            } else if (isUsingNumberComparisonWrong) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.ERROR,
                        'Use ' + OPERATOR_MAP[node.operator] + ' operator to compare strings.',
                        _root
                    )
                );
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function isLiteral(type, node) {
    return (
        node.type === 'Literal' &&
        typeof node.value === type
    );
}
