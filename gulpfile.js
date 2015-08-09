var gulp = require('gulp');
var path = require('path');
var fs   = require('fs');

gulp.task('cases', function () {
    var jsonify = require('./jsonify');
    var postcss = require('postcss');
    var cases   = path.join(__dirname, 'cases');
    fs.readdirSync(cases).forEach(function (name) {
        if ( !name.match(/\.css$/) ) return;
        var css  = fs.readFileSync(path.join(cases, name));
        var root = postcss.parse(css, { from: '/' + name });
        var file = path.join(cases, name.replace(/\.css$/, '.json'));
        fs.writeFileSync(file, jsonify(root));
    });
});
