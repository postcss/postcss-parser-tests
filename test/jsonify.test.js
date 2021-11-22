let { equal } = require('uvu/assert')
let { test } = require('uvu')
let postcss = require('postcss')

let jsonify = require('../jsonify')

test('converts to JSON string', () => {
  let node = postcss.rule()
  equal(
    jsonify(node),
    '{\n' + '  "raws": {},\n' + '  "type": "rule",\n' + '  "nodes": []\n' + '}'
  )
})

test('converts source.input', () => {
  let node = postcss.rule({
    source: {
      input: new postcss.Input('test', { from: '/a.css' })
    }
  })
  node.each(() => {})
  equal(
    jsonify(node),
    '{\n' +
      '  "raws": {},\n' +
      '  "source": {},\n' +
      '  "type": "rule",\n' +
      '  "nodes": []\n' +
      '}'
  )
})

test('converts source.input recursively', () => {
  let rule = postcss.rule({
    source: {
      start: {
        offset: 0,
        line: 1,
        column: 1
      },
      end: {
        offset: 14,
        line: 1,
        column: 15
      },
      input: new postcss.Input('test', { from: '/a.css' })
    }
  })
  let root = postcss.root()
  root.append(rule)

  equal(
    jsonify(root),
    '{\n' +
      '  "raws": {},\n' +
      '  "type": "root",\n' +
      '  "nodes": [\n' +
      '    {\n' +
      '      "raws": {},\n' +
      '      "source": {\n' +
      '        "start": {\n' +
      '          "offset": 0,\n' +
      '          "line": 1,\n' +
      '          "column": 1\n' +
      '        },\n' +
      '        "end": {\n' +
      '          "offset": 14,\n' +
      '          "line": 1,\n' +
      '          "column": 15\n' +
      '        }\n' +
      '      },\n' +
      '      "type": "rule",\n' +
      '      "nodes": []\n' +
      '    }\n' +
      '  ]\n' +
      '}'
  )
})

test.run()
