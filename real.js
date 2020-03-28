let PluginError = require('plugin-error')
let chalk = require('chalk')
let load = require('load-resources')
let path = require('path')
let log = require('fancy-log')

function createError (url, message, error) {
  if (error) {
    if (error.name === 'CssSyntaxError') {
      message += error.message
    } else {
      message += error.stack
    }
  }
  let err = new PluginError('integration', {
    showStack: false,
    message
  })
  err.url = url
  return err
}

const SITES = [
  ['GitHub', 'https://github.com/'],
  ['Twitter', 'https://twitter.com/'],
  ['Bootstrap', 'github:twbs/bootstrap:dist/css/bootstrap.css'],
  ['Habrahabr', 'http://habrahabr.ru/']
]

module.exports = function real (done, extra, callback) {
  if (!callback) {
    callback = extra
    extra = undefined
  }

  let lastDomain = false
  let caseIndex = -1

  let cases = SITES
  if (extra) cases = cases.concat(extra)

  let urls = cases.map(i => i[1])

  let finish = false
  load(urls, '.css', (css, url, last) => {
    if (finish) return

    let result
    try {
      result = callback(css).css
    } catch (e) {
      finish = true
      done(createError(url, 'Parsing error: ', e))
      return
    }

    if (result !== css) {
      finish = true
      done(createError(url, 'Output is not equal input'))
      return
    }

    let domain = url.match(/https?:\/\/[^/]+/)[0]
    if (domain !== lastDomain) {
      lastDomain = domain
      caseIndex += 1
      log('Test ' + cases[caseIndex][0] + ' styles')
    }
    log('     ' + chalk.green(path.basename(url)))

    if (last) done()
  })
}
