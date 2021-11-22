let { equal } = require('uvu/assert')
let { join } = require('path')
let { test } = require('uvu')

let { testPath } = require('../')

test('returns path', () => {
  equal(testPath('tab.css'), join(__dirname, '../cases/tab.css'))
})

test.run()
