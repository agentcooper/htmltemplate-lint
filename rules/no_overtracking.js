var traverse = require('traverse');

var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_overtracking';
var EXPERIMENT_REGEX = /b_track_experiment_([a-z0-9_]+)/;

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

        var isOverTracking = (
            node.type === 'BinaryExpression' &&
            node.operator === '&&' &&
            node.left.type === 'Identifier' &&
            node.left.name.match(EXPERIMENT_REGEX) &&
            !isDangerous(node.right)
        );

        if (isOverTracking) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.WARNING,
                    'Place tracking call on the right-hand side to reduce overtracking.',
                    _root
                )
            );
        }
    }
};

function isDangerous(node) {
    return traverse(node).reduce(function(dangerous, child) {
        return (
            dangerous ||
            child.type === 'MemberExpression' ||
            child.type === 'CallExpression'
        );
    }, false);
}
