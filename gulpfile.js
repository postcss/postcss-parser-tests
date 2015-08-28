var gulp = require('gulp');
var path = require('path');
var fs   = require('fs');

gulp.task('cases', function () {
    var jsonify = require('./jsonify');
    var postcss = require('postcss');
    var cases   = path.join(__dirname, 'cases');
    var extra   = require('./extra-cases');
    fs.readdirSync(cases).forEach(function (i) {
        if ( path.extname(i) !== '.json' ) return;
        var name = path.basename(i, '.json');
        var css  = extra[name];
        if ( !css ) css = fs.readFileSync(path.join(cases, name + '.css'));
        var root = postcss.parse(css, { from: '/' + name + '.css' });
        fs.writeFileSync(path.join(cases, i), jsonify(root) + '\n');
    });
});

gulp.task('lint', function () {
    var eslint = require('gulp-eslint');
    return gulp.src(['*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('integration', function (done) {
    var real = require('./real');
    real(done, [['Browserhacks', 'http://browserhacks.com/']], function (css) {
        return { css: css };
    });
});

gulp.task('test', function () {
    var mocha = require('gulp-mocha');
    return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('default', ['lint', 'integration']);
