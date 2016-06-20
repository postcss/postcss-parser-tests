var path = require('path');

function clean(node) {
    if ( node.source ) {
        delete node.source.input.css;
        node.source.input.file = path.basename(node.source.input.file);
    }

    delete node.indexes;
    delete node.lastEach;
    delete node.rawCache;
    delete node.id;

    if ( node.nodes ) node.nodes = node.nodes.map(clean);

    return node;
}

module.exports = function jsonify(node) {
    var cleaned = clean(node.toJSON());
    return JSON.stringify(cleaned, null, 2);
};
