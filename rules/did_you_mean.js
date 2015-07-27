var Levenshtein = require('levenshtein');

var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'did_you_mean';

var mistyped = [
    {
        search: 'b_experiment_hash',
        rx: /b_ex[a-z]+_h[a-z]{1,3}_/g,
        message: 'Did you mean b_experiment_hash?'
    },
    {
        search: 'b_track_experiment',
        rx: /b_t[a-z]{3,4}_ex[a-z]+_/g,
        message: 'Did you mean b_track_experiment?'
    }
];

module.exports = {
    run: function(node, done) {
        var content = getContent(node);

        if (!content) {
            return;
        }

        for (var i = 0; i < mistyped.length; i++) {
            var distance = (
                new Levenshtein(
                    // @TODO: is there another way, without slicing?
                    content.slice(0, mistyped[i].search.length),
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

            if (isMistyped(content, mistyped[i].rx, mistyped[i].search)) {
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

        return done(
            problem(RULE_NAME, C.RESULT_TYPES.NO_PROBLEMS)
        );
    }
};

function getContent(node) {
    if (node.type === 'SingleAttribute') {
        return node.name;
    }
    if (node.type === 'PairAttribute' && (typeof node.value === 'string')) {
        return node.value;
    }
    if (node.type === 'Expression') {
        return node.value;
    }
    return null;
}

function isMistyped(string, rx, search) {
    return (
        string.match(rx) &&
        string.indexOf(search) === -1
    );
}
