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
    },

    did_you_mean: {
        mistyped: [
            {
                search: 'b_experiment_hash',
                message: 'Did you mean b_experiment_hash?'
            },
            {
                search: 'b_track_experiment',
                message: 'Did you mean b_track_experiment?'
            }
        ]
    }
};