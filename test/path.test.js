let { join } = require('path')

let cases = require('../')

it('returns path', () => {
  expect(cases.path('tab.css')).toEqual(join(__dirname, '../cases/tab.css'))
})
