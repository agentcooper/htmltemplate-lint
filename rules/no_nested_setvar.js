var C = require('../lib/constants');
var problem = require('../lib/problem');
var walker = require('../walker');

var RULE_NAME = 'no_nested_setvar';

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_SETVAR') {
            walker(node.content, undefined, function(child) {
                if (child.name === 'TMPL_SETVAR') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.ERROR,
                            'Cannot nest TMPL_SETVAR statements.',
                            child
                        )
                    );
                }
            });
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
