var fs = require('fs');
var format = require('util').format;
var exec = require('sync-exec');

var PACKAGES_HOST = 'ayuldoshev-book.dev.booking.com';
var PACKAGES_PATH = 'backend_static/sublime_channel';
var PACKAGES_REPOSITORY_URL = format('https://%s/%s/packages.json', PACKAGES_HOST, PACKAGES_PATH);
var TEMPORARY_REPOSITORY_FILENAME = 'sublime-repository.json';

var pkg = require('../package.json');

console.log('bundling package..');
var bundledFilename = bundle();

console.log('retrieving packages list..');
var repository = fetchJSON(PACKAGES_REPOSITORY_URL);
var releases = repository.packages[0].releases;

if (isAlreadyReleased(releases, pkg.version)) {
    console.error('Version %s is already released!', pkg.version);
    cleanup([bundledFilename]);
    return;
}

// Updating releases list.
releases.push({
    version: pkg.version,
    url: format('https://%s/%s/%s', PACKAGES_HOST, PACKAGES_PATH, bundledFilename),
    date: formatDate(new Date()),
    sublime_text: '*'
});

fs.writeFileSync(
    TEMPORARY_REPOSITORY_FILENAME,
    JSON.stringify(repository, null, 4)
);

console.log('uploading package contents..');
exec(
    format(
        'scp %s %s:/usr/local/git_tree/%s/%s',
        bundledFilename,
        PACKAGES_HOST,
        PACKAGES_PATH,
        bundledFilename
    )
);

console.log('updating packages registry..');
exec(
    format(
        'scp %s %s:/usr/local/git_tree/%s/packages.json',
        TEMPORARY_REPOSITORY_FILENAME,
        PACKAGES_HOST,
        PACKAGES_PATH
    )
);

console.log('cleaning up..');
cleanup([TEMPORARY_REPOSITORY_FILENAME, bundledFilename]);

console.log('done!');

function bundle() {
    var filename = format('%s-release-v%s.zip', pkg.name, pkg.version);

    var exclude = [
        '*.git*',
        'docs/*',
        'test/*',
        'tools/*',
        'lib/parser/test/*',
        'lib/parser/node_modules/*'
    ].concat(
        // Omitting dev dependencies from the resulting bundle.
        Object.keys(pkg.devDependencies).map(function(dep) {
            return format('node_modules/%s/*', dep);
        })
    );

    exec(
        format(
            'zip -r %s . %s',
            filename,
            asCLIParam('x', exclude)
        )
    );

    console.log('packed directory contents into %s', filename);
    return filename;

    function asCLIParam(name, values) {
        return values
            .map(function(v) {
                return format('-%s "%s"', name, v);
            })
            .join(' ');
    }
}

function cleanup(files) {
    files.forEach(function(filename) {
        fs.unlinkSync(filename);
    });
}

function fetchJSON(url) {
    return JSON.parse(
        exec(format('curl "%s"', url)).stdout
    );
}

function formatDate(date) {
    return date
        .toISOString()
        .replace('T', ' ')
        .replace(/\.[0-9]+Z$/, '');
}

function isAlreadyReleased(rs, version) {
    return rs.some(function(r) {
        return r.version === version;
    });
}
