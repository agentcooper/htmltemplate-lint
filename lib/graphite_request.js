var net = require('net');
var format = require('util').format;

var GRAPHITE_NAMESPACE = 'user.ayuldoshev.htmltemplate_lint';

var params = JSON.parse(process.argv[2]);
var timestamp = Math.floor(Date.now() / 1000);

var socket = net.connect({
    host: 'ayuldoshev-app.dev.booking.com',
    port: 3002
}, function() {
    socket.write(format('%s.nr_lint %s %s\n', GRAPHITE_NAMESPACE, 1, timestamp));
    socket.write(format('%s.nr_warnings %s %s\n', GRAPHITE_NAMESPACE, params.warnings, timestamp));
    socket.write(format('%s.nr_errors %s %s\n', GRAPHITE_NAMESPACE, params.errors, timestamp));
    socket.end();
});
