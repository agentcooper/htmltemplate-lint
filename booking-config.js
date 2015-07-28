module.exports = {
    variable_name_style: {
        scope: {
            'TMPL_SETVAR': 1,
            'TMPL_ASSIGN': 1
        },
        match: function(name) {
            return name.indexOf('b_') !== 0;
        },
        message: 'Variables in templates should start with b_.'
    }
};
