var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_verbose_assignment';

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_SETVAR' && node.content.length === 1) {
            var firstChild = node.content[0];

            if ((firstChild.name === 'TMPL_VAR' || firstChild.name === 'TMPL_V') && firstChild.attributes.length === 1) {
                return done(
                    problem(
                        RULE_NAME,
                        C.RESULT_TYPES.WARNING,
                        'TMPL_SETVAR is too verbose for this case, use TMPL_ASSIGN.',
                        node
                    )
                );
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
