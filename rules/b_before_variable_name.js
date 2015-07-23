var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'b_before_variable_name';
var FORCED_PREFIX = 'b_';

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_SETVAR' || node.name === 'TMPL_ASSIGN') {
            for (var i = 0; i < node.attributes.length; i += 1) {
                var attribute = node.attributes[i];

                if (attribute.type === 'SingleAttribute') {
                    if (attribute.name.indexOf(FORCED_PREFIX) !== 0) {
                        return done(
                            problem(
                                RULE_NAME,
                                C.RESULT_TYPES.WARNING,
                                'Variables in templates should start with b_.',
                                attribute
                            )
                        );
                    } else {
                        break;
                    }
                }
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
