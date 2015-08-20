var net = require('net');
var format = require('util').format;

var GRAPHITE_NAMESPACE = 'user.ayuldoshev.htmltemplate_lint';

var params = JSON.parse(process.argv[2]);
var timestamp = Math.floor(Date.now() / 1000);

var socket = net.connect({
    host: 'ayuldoshev-app.dev.booking.com',
    port: 3002
}, function() {
    socket.send(format('%s.nr_lint %d %d\n', GRAPHITE_NAMESPACE, 1, timestamp));
    socket.send(format('%s.nr_warnings %d %d\n', GRAPHITE_NAMESPACE, params.warnings, timestamp));
    socket.send(format('%s.nr_errors %d %d\n', GRAPHITE_NAMESPACE, params.errors, timestamp));
    socket.end();
});
