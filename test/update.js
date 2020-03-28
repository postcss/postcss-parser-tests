#!/usr/bin/env node

let path = require('path')
let fs = require('fs')

let postcss = require('../../postcss/lib/postcss')
let jsonify = require('../jsonify')
let extra = require('../extra-cases')

let cases = path.join(__dirname, '..', 'cases')

function read (file) {
  return fs.readFileSync(path.join(cases, file)).toString()
}

fs.readdirSync(cases).forEach(i => {
  if (path.extname(i) !== '.json') return
  let name = path.basename(i, '.json')
  let css = extra[name]
  if (!css) css = read(name + '.css').trim()
  let root = postcss.parse(css, { from: '/' + name + '.css' })
  fs.writeFileSync(path.join(cases, name + '.json'), jsonify(root) + '\n')
  process.stdout.write('.')
})

process.stdout.write('\n')
