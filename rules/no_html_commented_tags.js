var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_html_commented_tags';

module.exports = {
    run: function(node, done) {

        if (node.type === 'Text' && hasUnclosedHTMLComment(node.content)) {
            var parentContent = node.parent;

            if (parentContent.type === 'ConditionBranch' || parentContent.type === 'AlternateConditionBranch') {
                parentContent = parentContent.content;
            }

            var index = parentContent.indexOf(node);

            for (var i = (index + 1); i < parentContent.length; i += 1) {
                var nextNode = parentContent[i];

                // If any next text sibling closes the opened comment, stop
                // the iteration.
                if (nextNode.type === 'Text' && isClosingHTMLComment(nextNode.content)) {
                    break;
                }

                if (nextNode.type !== 'Comment') {
                    return done(
                        problem(
                            RULE_NAME,
                            C.RESULT_TYPES.ERROR,
                            'Do not wrap template tags in HTML comments.',
                            nextNode.position
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

function hasUnclosedHTMLComment(string) {
    return string.lastIndexOf('<!--') > string.lastIndexOf('-->');
}

function isClosingHTMLComment(string) {
    return string.indexOf('-->') !== -1;
}
