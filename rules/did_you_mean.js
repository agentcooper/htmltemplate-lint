var Levenshtein = require('levenshtein');

var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'did_you_mean';

var PERL_IDENTIFIER = /\$[_0-9a-zA-Z]+/g;

function setup(config) {
    var mistyped = config.mistyped;

    return {
        run: function(node, done) {
            var content = getContent(node);

            if (content.length === 0) {
                return done(
                    problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
                );
            }

            for (var j = 0; j < content.length; j++) {
                for (var i = 0; i < mistyped.length; i++) {
                    var distance = (
                        new Levenshtein(
                            // @TODO: is there another way, without slicing?
                            content[j].slice(0, mistyped[i].search.length),
                            mistyped[i].search
                        )
                    ).distance;

                    // @FIXME: find a good range
                    if (distance > 0 && distance < 5) {
                        return done(
                            problem(
                                RULE_NAME,
                                C.RESULT_TYPES.WARNING,
                                mistyped[i].message,
                                node
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
};

module.exports = setup;

function getContent(node) {
    if (node.type === 'SingleAttribute') {
        return [node.name];
    }
    if (node.type === 'PairAttribute' && node.value && (typeof node.value.name === 'string')) {
        return [node.value.name];
    }
    if (node.type === 'Expression') {
        var match = node.value.match(PERL_IDENTIFIER);

        if (!match) {
            return [];
        }

        return match.map(function(expr) {
            return expr && expr.replace('$', '');
        });
    }
    return [];
}
