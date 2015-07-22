var fs = require('fs');
var inspect = require('util').inspect;

var parser = require('htmltemplate-parser');

var run = require('./run');
var rules = require('./rules');

module.exports = function(filename) {
    var tmpl = fs.readFileSync(filename, 'utf8');

    try {
        var ast = parser.parse(tmpl);
    } catch(e) {
        console.error(e);
    }

    run(ast, rules, function(log) {
        console.log(inspect(log, { colors: true, depth: Infinity }));
    });
};
