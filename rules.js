module.exports = [
    require('./rules/b_before_variable_name'),
    require('./rules/did_you_mean'),
    require('./rules/missing_required_attr'),
    require('./rules/no_complex_unless'),
    require('./rules/no_empty_condition'),
    require('./rules/no_generate_variant'),
    require('./rules/no_html_commented_tags'),
    require('./rules/no_invalid_tags'),
    require('./rules/no_nested_setvar'),
    require('./rules/no_tmpl_loop'),
    require('./rules/no_verbose_assignment'),
    require('./rules/wrap_in_markers')
];
