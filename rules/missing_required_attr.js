var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'missing_required_attr';

function setup(REQUIRED_ATTR) {
    return {
        run: function(node, done) {
            var requiresNameAttribute = REQUIRED_ATTR[node.name];

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
                attr.name === 'name'
            ) || (
                attr.type === 'Expression'
            )
        );
    });
}

module.exports = setup;
