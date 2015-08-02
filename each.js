var path = require('path');
var fs   = require('fs');

function read(file) {
    return fs.readFileSync(path.join(__dirname, 'cases', file));
}

module.exports = function (callback) {
    fs.readdirSync(path.join(__dirname, 'cases')).filter(function (i) {
        if ( path.extname(i) !== '.css' ) return;
        var css  = read(i).toString();
        var json = read(i.replace(/\.css$/, '.json')).toString().trim();
        callback(i, css, json);
    });
};
