let { deepStrictEqual } = require('node:assert')
let { test } = require('node:test')
let postcss = require('postcss')

let jsonify = require('../jsonify')

test('converts to JSON string', () => {
  let node = postcss.rule()
  deepStrictEqual(jsonify(node), { nodes: [], raws: {}, type: 'rule' })
})

test('converts source.input', () => {
  let node = postcss.rule({
    source: {
      input: new postcss.Input('test', { from: '/a.css' })
    }
  })
  node.each(() => {})
  deepStrictEqual(jsonify(node), {
    nodes: [],
    raws: {},
    source: {},
    type: 'rule'
  })
})

test('converts source.input recursively', () => {
  let rule = postcss.rule({
    source: {
      end: {
        column: 15,
        line: 1,
        offset: 14
      },
      input: new postcss.Input('test', { from: '/a.css' }),
      start: {
        column: 1,
        line: 1,
        offset: 0
      }
    }
  })
  let root = postcss.root()
  root.append(rule)

  deepStrictEqual(jsonify(root), {
    nodes: [
      {
        nodes: [],
        raws: {},
        source: {
          end: {
            column: 15,
            line: 1,
            offset: 14
          },
          start: {
            column: 1,
            line: 1,
            offset: 0
          }
        },
        type: 'rule'
      }
    ],
    raws: {},
    type: 'root'
  })
})
