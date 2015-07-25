var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_ancient_experiments';
var EXPERIMENT_REGEX = /(?:b_experiment_hash|b_track_experiment|b_generate_variant_for_js_tracking)_([a-z0-9_]+)/;

var ancients = require('./no_ancient_experiments/ancients.json');

module.exports = {
    run: function(node, done) {
        var experimentMatch = extractExperimentName(node);
        var experimentName = Array.isArray(experimentMatch) ? experimentMatch[1] : null;

        if (experimentName && ancients.indexOf(experimentName) !== -1) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.WARNING,
                    experimentName + ' is a very old stopped experiment.',
                    node
                )
            );
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function extractExperimentName(node) {
    if (node.type === 'SingleAttribute') {
        return node.name.match(EXPERIMENT_REGEX);
    } else if (node.type === 'PairAttribute' && typeof node.value === 'string') {
        return node.value.match(EXPERIMENT_REGEX);
    } else if (node.type === 'Expression') {
        return node.value.match(EXPERIMENT_REGEX);
    }

    return null;
}
