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
      input: {
        css: 'test',
        file: '/a.css'
      }
    }
  })
  node.each(() => {})
  expect(jsonify(node)).toEqual(
    '{\n' +
      '  "raws": {},\n' +
      '  "source": {\n' +
      '    "input": {\n' +
      '      "file": "a.css"\n' +
      '    }\n' +
      '  },\n' +
      '  "type": "rule",\n' +
      '  "nodes": []\n' +
      '}'
  )
})

it('converts source.input recursively', () => {
  let rule = postcss.rule({
    source: {
      input: {
        css: 'test',
        file: '/a.css'
      }
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
      '        "input": {\n' +
      '          "file": "a.css"\n' +
      '        }\n' +
      '      },\n' +
      '      "type": "rule",\n' +
      '      "nodes": []\n' +
      '    }\n' +
      '  ]\n' +
      '}'
  )
})
