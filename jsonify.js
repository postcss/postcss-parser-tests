var path = require('path');

function clean(node) {
    delete node.source.input.css;
    node.source.input.file = path.basename(node.source.input.file);
    node.source.input.from = path.basename(node.source.input.from);
    if ( node.nodes ) node.nodes = node.nodes.map(clean);
    return node;
}

module.exports = function jsonify(node) {
    var cleaned = clean(node.toJSON());
    return JSON.stringify(cleaned, null, 4);
};
