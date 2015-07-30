var uuid = require('node-uuid');
var Analytics = require('analytics-node');

var analytics = new Analytics('Y19tmjRxi6tsHHepslVNpbsjZPEY13Nm');

var params = JSON.parse(process.argv[2]);

analytics.track({
    anonymousId: uuid.v4(),
    event: params.event,
    properties: {
        Warnings: params.warnings,
        Errors: params.errors
    }
});
