module.exports = {
    variable_name_style: {
        scope: {
            'TMPL_SETVAR': 1,
            'TMPL_ASSIGN': 1
        },
        match: function(name) {
            return !name.match(/^(?:b|fe)_/);
        },
        message: 'Prefix local variables with b_ or fe_. Pass variables for copy tags as attributes to TMPL_VAR'
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
