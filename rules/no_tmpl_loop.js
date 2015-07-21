// https://github.com/agentcooper/htmltemplate-lint/issues/1

module.exports = {
    run: function(node, done) {
        if (node.name === 'TMPL_LOOP') {
            return done({
                type: 'warning',
                name: 'no_tmpl_loop',
                message: 'It is better to use TMPL_FOR instead',
                position: node.position
            });
        }
        return done(null);
    }
};
