var util = require('util');

module.exports = function(report, filepath) {
    return report.map(function(entry) {
        return util.format(
            '%s: line %d, col %d, %s - %s. (%s)',
            filepath,
            entry.position.line,
            entry.position.column,
            entry.type,
            entry.name,
            entry.message
        );
    }).join('\n');
};
