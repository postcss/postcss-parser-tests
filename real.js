var gutil = require('gulp-util');
var load  = require('load-resources');
var path  = require('path');

var error = function (url, message) {
    var err = new gutil.PluginError('integration', {
        showStack: false,
        message:   message
    });
    err.url = url;
    return err;
};

var sites = [
    ['GitHub',    'https://github.com/'],
    ['Twitter',   'https://twitter.com/'],
    ['Bootstrap', 'github:twbs/bootstrap:dist/css/bootstrap.css'],
    ['Habrahabr', 'http://habrahabr.ru/']
];

module.exports = function (done, extra, callback) {
    if ( !callback ) {
        callback = extra;
        extra    = undefined;
    }

    var lastDomain = false;
    var caseIndex  = -1;

    var cases = sites;
    if ( extra ) cases = cases.concat(extra);

    var urls = cases.map(function (i) {
        return i[1];
    });

    load(urls, '.css', function (css, url, last) {
        var result;
        try {
            result = callback(css);
        } catch (e) {
            return done(error(url, 'Parsing error: ' + e.message + e.stack));
        }

        if ( result.css !== css ) {
            return done(error(url, 'Output is not equal input'));
        }

        var domain = url.match(/https?:\/\/[^\/]+/)[0];
        if ( domain !== lastDomain ) {
            lastDomain = domain;
            caseIndex += 1;
            gutil.log('Test ' + cases[caseIndex][0] + ' styles');
        }
        gutil.log('     ' + gutil.colors.green(path.basename(url)));

        if ( last ) done();
    });
};
