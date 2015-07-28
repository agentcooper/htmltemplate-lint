var C = require('../lib/constants');
var problem = require('../lib/problem');

var RULE_NAME = 'variable_name_style';

function setup(config) {
    return {
        run: function(node, done) {
            if (config.scope[node.name]) {
                for (var i = 0; i < node.attributes.length; i += 1) {
                    var attribute = node.attributes[i];

                    if (attribute.type === 'SingleAttribute') {
                        if (config.match(attribute.name)) {
                            return done(
                                problem(
                                    RULE_NAME,
                                    C.RESULT_TYPES.WARNING,
                                    config.message,
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
    }
};

module.exports = setup;
