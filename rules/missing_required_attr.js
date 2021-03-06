var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'missing_required_attr';

module.exports = {
    run: function(node, done) {
        var requiresNameAttribute = (
            node.name === 'TMPL_VAR' ||
            node.name === 'TMPL_SETVAR' ||
            node.name === 'TMPL_INCLUDE' ||
            node.name === 'TMPL_INLINE' ||
            node.name === 'TMPL_V' ||
            node.name === 'TMPL_BLOCK'
        );

        if (requiresNameAttribute && !hasNameOrLowerCaseAttribute(node)) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.ERROR,
                    node.name + ' is missing required attribute.',
                    node
                )
            );
        }

        if (node.name === 'TMPL_ASSIGN' && node.attributes.length < 2) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.ERROR,
                    'TMPL_ASSIGN expects variable name and assigned expression.',
                    node
                )
            );
        }

        if (node.type === 'ConditionBranch' && !node.condition) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.ERROR,
                    'Condition branch is missing required condition expression.',
                    node
                )
            );
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function hasNameOrLowerCaseAttribute(node) {
    return node.attributes.some(function(attr) {
        return (
            (
                attr.type === 'SingleAttribute' &&
                attr.name.match(/[a-z0-9_]/g)
            ) || (
                attr.type === 'PairAttribute' &&
                attr.name.toLowerCase() === 'name'
            ) || (
                attr.type === 'Expression'
            )
        );
    });
}
