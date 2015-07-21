var assert = require('assert');

var parser = require('htmltemplate-parser');

var run = require('../run');

var multiline = require('multiline');

describe('no_tmpl_loop', function() {
    it('should warn about TMPL_LOOP usage', function(done) {
        var tmpl = multiline(function(){/*
        <TMPL_LOOP><TMPL_VAR name></TMPL_LOOP>
        */});

        var ast = parser.parse(tmpl);

        run(ast, {
            // @FIXME: or should we run all rules at the same time?
            no_tmpl_loop: require('../rules/no_tmpl_loop')
        }, function(log) {
            assert.equal(log[0].name, 'no_tmpl_loop');
            assert.deepEqual(log[0].position, { line: 1, column: 9 });

            done();
        });
    });
});
