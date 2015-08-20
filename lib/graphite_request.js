var net = require('net');
var format = require('util').format;

var GRAPHITE_NAMESPACE = 'user.ayuldoshev.htmltemplate_lint';

var params = JSON.parse(process.argv[2]);
var timestamp = Math.floor(Date.now() / 1000);

var socket = net.connect({
    host: 'ayuldoshev-app.dev.booking.com',
    port: 3002
}, function() {
    socket.end([
        format('%s.nr_lint %d %d', GRAPHITE_NAMESPACE, 1, timestamp),
        format('%s.nr_warnings %d %d', GRAPHITE_NAMESPACE, params.warnings, timestamp),
        format('%s.nr_errors %d %d', GRAPHITE_NAMESPACE, params.errors, timestamp)
    ].join('\n'));
});
