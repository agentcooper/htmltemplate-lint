var util = require('util');

var type = {
    error: 'Error',
    warning: 'Warning'
};

module.exports = function(report, filepath) {
    return report.map(function(entry) {
        return util.format(
            '%s: line %d, col %d, %s - %s. (%s)',
            filepath,
            entry.position.line,
            entry.position.column,
            type[entry.type],
            entry.name
        );
    }).join('\n');
};
