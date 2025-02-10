let { join } = require('node:path')
let { test } = require('uvu')
let { equal } = require('uvu/assert')

let { testPath } = require('../')

test('returns path', () => {
  equal(testPath('tab.css'), join(__dirname, '../cases/tab.css'))
})

test.run()
