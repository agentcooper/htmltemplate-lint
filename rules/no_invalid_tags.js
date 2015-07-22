var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'no_invalid_tags';

var KNOWN_TAGS = [
    // These tags are secret for the public:
    'TMPL_CSRF_TOKEN',
    'TMPL_CSRF_FORM',
    // These tags are not implemented by the parser:
    'TMPL_CASE',
    'TMPL_WHEN',
    'TMPL_OTHERWISE'
];

module.exports = {
    run: function(node, done) {
        if (node.type === 'InvalidTag' && KNOWN_TAGS.indexOf(node.name) === -1) {
            return done(
                problem(
                    RULE_NAME,
                    C.RESULT_TYPES.ERROR,
                    'Invalid tag ' + node.name + '.',
                    node.position
                )
            );
        }

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};
