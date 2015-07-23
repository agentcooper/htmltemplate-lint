var C = require('../lib/constants');
var problem = require('../lib/problem');
var isWhiteSpaceOnlyNode = require('../lib/util').isWhiteSpaceOnlyNode;

var RULE_NAME = 'wrap_in_markers';

module.exports = {
    run: function(node, done) {
        if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i += 1) {
                var child = node[i];

                if (child.name === 'TMPL_MARKER' && child.attributes[0].name === 'START') {
                    break;
                }

                if (!isWhiteSpaceOnlyNode(child) && child.type !== 'Comment') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            'Begin template file with <TMPL_MARKER START>.',
                            child
                        )
                    );
                }
            }

            for (var i = (node.length - 1); i >= 0; i -= 1) {
                var child = node[i];

                if (child.name === 'TMPL_MARKER' && child.attributes[0].name === 'END') {
                    break;
                }

                if (!isWhiteSpaceOnlyNode(child) && child.type !== 'Comment') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.WARNING,
                            'End template file with <TMPL_MARKER END>.',
                            child
                        )
                    );
                }
            }
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
