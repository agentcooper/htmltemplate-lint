var Levenshtein = require('levenshtein');

var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'did_you_mean';

var PERL_IDENTIFIER = /\$[_0-9a-zA-Z]+/g;

var mistyped = [
    {
        search: 'b_experiment_hash',
        message: 'Did you mean b_experiment_hash?'
    },
    {
        search: 'b_track_experiment',
        message: 'Did you mean b_track_experiment?'
    }
];

module.exports = {
    run: function(node, done) {
        var content = getContent(node);

        if (content.length === 0) {
            return;
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

function getContent(node) {
    if (node.type === 'SingleAttribute') {
        return [node.name];
    }
    if (node.type === 'PairAttribute' && (typeof node.value === 'string')) {
        return [node.value];
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
