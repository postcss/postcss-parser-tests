let postcss = require('postcss')

let jsonify = require('../jsonify')

it('converts to JSON string', () => {
  let node = postcss.rule()
  expect(jsonify(node)).toEqual(
    '{\n' + '  "raws": {},\n' + '  "type": "rule",\n' + '  "nodes": []\n' + '}'
  )
})

it('converts source.input', () => {
  let node = postcss.rule({
    source: {
      input: new postcss.Input('test', { from: '/a.css' })
    }
  })
  node.each(() => {})
  expect(jsonify(node)).toEqual(
    '{\n' +
      '  "raws": {},\n' +
      '  "source": {},\n' +
      '  "type": "rule",\n' +
      '  "nodes": []\n' +
      '}'
  )
})

it('converts source.input recursively', () => {
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

  expect(jsonify(root)).toEqual(
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
