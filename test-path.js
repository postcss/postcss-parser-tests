let { join } = require('node:path')

module.exports = function testPath(name) {
  return join(__dirname, 'cases', name)
}
