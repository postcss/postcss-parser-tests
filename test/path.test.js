let { join } = require('path')

let { testPath } = require('../')

it('returns path', () => {
  expect(testPath('tab.css')).toEqual(join(__dirname, '../cases/tab.css'))
})
