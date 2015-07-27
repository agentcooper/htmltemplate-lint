/**
 * This script generates a list of experiments stopped more than 6 months ago.
 * The list is then used in `no_ancient_experiments` rule. The script can
 * be run as:
 *
 *     npm run generate-ancients
 *
 * from the project root.
 */

var fs = require('fs');
var path = require('path');

var request = require('request');
var read = require('read');

// FIXME: Use latest dataset, not hardcoded. Can add something like
// `dataset=latest` to the JSON generator in main.
var HUNTER_URL = 'https://office.booking.com/hunter/blob.html?dataset=2015-06-26';

getCredentials(function(err, credentials) {
    if (err) {
        return console.error(err);
    }

    fetchHunterData(credentials.username, credentials.password, function(err, data) {
        if (err) {
            return console.error(err);
        }

        var ancient = getAncientExperiments(data.experiment);

        fs.writeFileSync(
            path.join(__dirname, '..', 'rules', 'no_ancient_experiments', 'ancients.json'),
            JSON.stringify(
                ancient, null, 2)
        );
        console.log('ancients.json written with %d experiments', ancient.length);
    });
});


function getCredentials(callback) {
    read({ prompt: 'Username for office.booking.com: ' }, function(err, username) {
        if (err) {
            return callback(err);
        }

        read({ prompt: 'Password: ', silent: true }, function(err, password) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                username: username,
                password: password
            });
        });
    });
}

function fetchHunterData(username, password, callback) {
    var options = {
        auth: {
            user: username,
            pass: password
        }
    };

    request.get(HUNTER_URL, options, function(err, response, body) {
        if (err) {
            return callback(err);
        }

        callback(null, JSON.parse(body));
    });
}

function getAncientExperiments(all) {
    var threshold = new Date();

    threshold.setMonth(threshold.getMonth() - 6);

    return all
        .filter(function(exp) {
            return (
                exp.status === 'stopped' &&
                !exp.fullon &&
                Number(exp.until) < threshold.getTime()
            );
        })
        .map(function(exp) {
            return exp.name;
        })
        .concat('test_only_old_experiment_name');
}
