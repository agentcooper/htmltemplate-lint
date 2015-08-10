var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_generate_variant';
var GENERATE_VARIANT_VARIABLE_PREFIX = 'b_generate_variant_for_js_tracking';

module.exports = {
    run: function(node, done) {
        var hasError = (
            (
                node.type === 'SingleAttribute' &&
                mentionsGenerateVariant(node.name)
            ) || (
                node.type === 'PairAttribute' &&
                typeof node.value === 'string' &&
                mentionsGenerateVariant(node.value)
            ) || (
                node.type === 'Expression' &&
                mentionsGenerateVariant(node.value)
            )
        );

        if (hasError) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.WARNING,
                    'b_generate_variant_for_js_tracking is deprecated.',
                    node
                )
            );
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function mentionsGenerateVariant(string) {
    return string.indexOf(GENERATE_VARIANT_VARIABLE_PREFIX) !== -1;
}
