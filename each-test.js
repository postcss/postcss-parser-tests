let { readFileSync, readdirSync } = require('fs')
let { join, extname, basename } = require('path')

let extra = require('./extra-cases')

function read (file) {
  return readFileSync(join(__dirname, 'cases', file))
}

module.exports = function eachTest (callback) {
  readdirSync(join(__dirname, 'cases')).filter(i => {
    if (extname(i) !== '.json') return
    let json = read(i)
      .toString()
      .trim()
    let name = basename(i, '.json')
    let css = extra[name]
    if (!css) {
      css = read(name + '.css')
        .toString()
        .trim()
    }
    callback(name + '.css', css, json)
  })
}
