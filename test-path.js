let { join } = require('path')

module.exports = function testPath(name) {
  return join(__dirname, 'cases', name)
}
