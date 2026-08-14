let { deepStrictEqual } = require('node:assert')
let { join } = require('node:path')
let { test } = require('node:test')

let { testPath } = require('../')

test('returns path', () => {
  deepStrictEqual(testPath('tab.css'), join(__dirname, '../cases/tab.css'))
})
