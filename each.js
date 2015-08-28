var path = require('path');
var fs   = require('fs');

function read(file) {
    return fs.readFileSync(path.join(__dirname, 'cases', file));
}

let extra = require('./extra-cases');

module.exports = function (callback) {
    fs.readdirSync(path.join(__dirname, 'cases')).filter(function (i) {
        if ( path.extname(i) !== '.json' ) return;
        var json = read(i).toString();
        var css  = extra[i.replace(/.js$/, '')];
        if ( !css ) css = read(i.replace(/\.js$/, '.css')).toString().trim();
        callback(i, css, json);
    });
};
