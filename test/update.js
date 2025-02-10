#!/usr/bin/env node

let fs = require('node:fs')
let path = require('node:path')

let postcss = require('../../postcss/lib/postcss')
let extra = require('../extra-cases')
let jsonify = require('../jsonify')

let cases = path.join(__dirname, '..', 'cases')

function read(file) {
  return fs.readFileSync(path.join(cases, file)).toString()
}

fs.readdirSync(cases).forEach(i => {
  if (path.extname(i) !== '.json') return
  let name = path.basename(i, '.json')
  let css = extra[name]
  if (!css) css = read(name + '.css').trim()
  let root
  try {
    root = postcss.parse(css, { from: '/' + name + '.css' })
  } catch (e) {
    process.stderr.write('\n./cases/' + name + '.css\n' + e.stack + '\n')
    process.exit(1)
  }
  let json = JSON.stringify(jsonify(root), null, 2)
  fs.writeFileSync(path.join(cases, name + '.json'), json + '\n')
  process.stdout.write('.')
})

process.stdout.write('\n')
