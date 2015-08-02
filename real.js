var gutil = require('gulp-util');
var load  = require('load-resources');

var error = function (url, message) {
    gutil.log(gutil.colors.red('Fail on ' + url));
    done(new gutil.PluginError('integration', {
        showStack: false,
        message:   message
    }));
};

var sites = [
    ['GitHub',    'https://github.com/'],
    ['Twitter',   'https://twitter.com/'],
    ['Bootstrap', 'github:twbs/bootstrap:dist/css/bootstrap.css'],
    ['Habrahabr', 'http://habrahabr.ru/']
];

module.exports = function (parser, extra, done) {
    var lastDomain = false;
    var caseIndex  = -1;

    var cases = sites;
    if ( extra ) cases = cases.concat(extra);

    var urls = cases.map(function (i) {
        return i[1];
    });

    load(urls, '.css', function (css, url, last) {
        try {
            let result = parser(css).toResult({ map: { annotation: false } });
        } catch (e) {
            return error(url, 'Parsing error: ' + e.message + e.stack);
        }

        if ( result.css !== css ) {
            error(url, 'Output is not equal input');
            return;
        }

        let domain = url.match(/https?:\/\/[^\/]+/)[0];
        if ( domain !== lastDomain ) {
            lastDomain = domain;
            caseIndex += 1;
            gutil.log('Test ' + cases[caseIndex][0] + ' styles');
        }
        gutil.log('     ' + gutil.colors.green(path.basename(url)));

        if ( last ) done();
    });
});
