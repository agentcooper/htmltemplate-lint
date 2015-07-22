var fs = require('fs');
var path = require('path');
var assert = require('assert');

var linter = require('..');

describe('rules', function() {

    fs.readdirSync(__dirname)
        .filter(function(name) {
            return name.indexOf('.js') === -1;
        })
        .forEach(function(name) {
            it(name, function(done) {

                var tmpl = fs.readFileSync(
                    path.join(__dirname, name, 'template.tmpl'),
                    'utf8'
                );

                var expected = JSON.parse(
                    fs.readFileSync(
                        path.join(__dirname, name, 'report.json'),
                        'utf8'
                    )
                );

                linter(tmpl, function(actual) {
                    assert.deepEqual(expected, actual);
                    done();
                });

            });
        });

});
