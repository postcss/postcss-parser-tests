let ciJobNumber = require('ci-job-number')
let Spinnies = require('spinnies')
let chalk = require('chalk')

let load = require('./load')

const SITES = [
  'https://github.com/',
  'https://habr.com/',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.css'
]

function succeed (spinnies, url) {
  if (process.env.CI) {
    process.stdout.write('✔ ' + url + '\n')
  } else {
    spinnies.succeed(url)
  }
}

function fail (spinnies, url) {
  if (!process.env.CI) {
    spinnies.fail(url)
  }
}

module.exports = async function real (callback, extra = []) {
  if (ciJobNumber() !== 1) {
    process.stderr.write(
      chalk.yellow(
        'Integration CSS tests run only on first CI job, to save CI resources\n'
      )
    )
    return
  }

  let spinnies = new Spinnies()

  await load(spinnies, succeed, SITES.concat(extra), (css, url) => {
    let result
    try {
      result = callback(css).css
    } catch (e) {
      fail(spinnies, url)
      process.stderr.write(
        '\n' + chalk.red(url) + '\n' + chalk.bgRed(' Parsing error ') + ' '
      )
      if (e.name === 'CssSyntaxError') {
        process.stderr.write(chalk.red(e.message))
      } else {
        process.stderr.write(chalk.red(e.stack))
      }
      process.stderr.write('\n')
      process.exit(1)
    }

    if (result !== css) {
      fail(spinnies, url)
      process.stderr.write(
        '\n' + chalk.red(url) + '\n' + chalk.bgRed(' Different output ') + '\n'
      )
      process.exit(1)
    }

    succeed(spinnies, url)
  })
}
