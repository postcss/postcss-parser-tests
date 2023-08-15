function clean(node) {
  if (node.source) {
    delete node.source.input
    delete node.source.inputId
  }
  delete node.inputs
  delete node.indexes
  delete node.lastEach
  delete node.rawCache

  if (node.nodes) node.nodes = node.nodes.map(clean)

  return node
}

module.exports = function jsonify(node) {
  let cleaned = clean(node.toJSON())
  return JSON.parse(JSON.stringify(cleaned, null, 2))
}
