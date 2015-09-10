var bookingConfig = require('./booking-config');

var rules = [
    'did_you_mean',
    'missing_required_attr',
    'no_ancient_experiments',
    'no_complex_unless',
    'no_empty_condition',
    'no_generate_variant',
    'no_html_commented_tags',
    'no_invalid_tags',
    'no_nested_blocks',
    'no_nested_setvar',
    'no_tmpl_loop',
    'no_verbose_assignment',
    'variable_name_style',
    'wrap_in_markers'
];

module.exports = rules.map(function(rule) {
    var ruleObj = require('./rules/' + rule);

    if (bookingConfig[rule] && typeof ruleObj === 'function') {
        return ruleObj(bookingConfig[rule]);
    }

    return ruleObj;
});
