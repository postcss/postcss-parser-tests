let { join } = require('path')

module.exports = function path (name) {
  return join(__dirname, 'cases', name)
}
