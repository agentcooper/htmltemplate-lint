var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_track_stage_zero';

module.exports = {
    run: function(node, done) {
        var isWrongTrackStageCall = (
            node.type === 'CallExpression' &&
            node.callee.name === 'track_experiment_stage' &&
            node.arguments.length === 2 &&
            node.arguments[1].value === 0
        );

        if (isWrongTrackStageCall) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.ERROR,
                    'Don\'t call track_experiment_stage for stage 0, use b_track_experiment instead.',
                    node.callee
                )
            );
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
