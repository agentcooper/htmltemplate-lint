var spawn = require('child_process').spawn;
var join = require('path').join;

module.exports = function(eventName, warnings, errors) {
    spawn(
        'node',
        [
            join(__dirname, 'graphite_request.js'),
            JSON.stringify({
                event: eventName,
                warnings: warnings,
                errors: errors
            })
        ],
        {
            detached: true
        }
    );
};
