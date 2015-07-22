var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'did_you_mean';
var DID_YOU_MEAN_EXPERIMENT_HASH = 'Did you mean b_experiment_hash?';
var DID_YOU_MEAN_TRACK_EXPERIMENT = 'Did you mean b_track_experiment?';

var B_EXPERIMENT_HASH_STRING = 'b_experiment_hash';
var B_EXPERIMENT_HASH_REGEX = /b_ex[a-z]+_h[a-z]{1,3}_/g;
var B_TRACK_EXPERIMENT_STRING = 'b_track_experiment';
var B_TRACK_EXPERIMENT_REGEX = /b_t[a-z]{3,4}_ex[a-z]+_/g;

module.exports = {
    run: function(node, done) {
        if (node.type === 'SingleAttribute') {
            if (isMistypedBExperimentHash(node.name)) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        DID_YOU_MEAN_EXPERIMENT_HASH,
                        node.position
                    )
                );
            } else if (isMistypedBTrackExperiment(node.name)) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        DID_YOU_MEAN_TRACK_EXPERIMENT,
                        node.position
                    )
                );
            }
        }

        if (node.type === 'PairAttribute' && (typeof node.value === 'string') && isMistypedBExperimentHash(node.value)) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.WARNING,
                    DID_YOU_MEAN_EXPERIMENT_HASH,
                    node.position
                )
            );
        }

        if (node.type === 'Expression') {
            if (isMistypedBExperimentHash(node.value)) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        DID_YOU_MEAN_EXPERIMENT_HASH,
                        node.position
                    )
                );
            } else if (isMistypedBTrackExperiment(node.value)) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        DID_YOU_MEAN_TRACK_EXPERIMENT,
                        node.position
                    )
                );
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function isMistypedBExperimentHash(string) {
    return (
        string.match(B_EXPERIMENT_HASH_REGEX) &&
        string.indexOf(B_EXPERIMENT_HASH_STRING) !== 0
    );
}

function isMistypedBTrackExperiment(string) {
    return (
        string.match(B_TRACK_EXPERIMENT_REGEX) &&
        string.indexOf(B_TRACK_EXPERIMENT_STRING) !== 0
    );
}
