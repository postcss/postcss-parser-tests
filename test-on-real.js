let pico = require('picocolors')

let load = require('./load')

const SITES = [
  'https://github.com/',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.css'
]

function succeed(url) {
  let text = url.replace(/^https?:\/\//, '')
  process.stdout.write(pico.green('✔ ') + text + '\n')
}

module.exports = async function testOnReal(callback, extra = []) {
  await load(succeed, SITES.concat(extra), (css, url) => {
    let result
    try {
      result = callback(css).css
    } catch (e) {
      process.stderr.write(
        '\n' + pico.red(url) + '\n' + pico.bgRed(' Parsing error ') + ' '
      )
      if (e.name === 'CssSyntaxError') {
        process.stderr.write(pico.red(e.message))
      } else {
        process.stderr.write(pico.red(e.stack))
      }
      process.stderr.write('\n')
      process.exit(1)
    }

    if (result !== css) {
      process.stderr.write(
        '\n' + pico.red(url) + '\n' + pico.bgRed(' Different output ') + '\n'
      )
      process.exit(1)
    }

    succeed(url)
  })
}
