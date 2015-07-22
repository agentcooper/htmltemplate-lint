var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_tmpl_loop';

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_LOOP') {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.WARNING,
                    'It is better to use TMPL_FOR instead.',
                    node.position
                )
            );
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
