let https = require('https')
let pico = require('picocolors')
let zlib = require('zlib')

function showError(url, message) {
  process.stderr.write(
    '\n' +
      pico.red(url) +
      '\n' +
      pico.bgRed(' Request error ') +
      ' ' +
      message +
      '\n'
  )
  process.exit(1)
}

function download(url, callback, errors = 0) {
  function onError(e) {
    if (errors > 2) showError(url, e.toString())
    process.stderr.write(e.toString() + '\n')
    download(url, callback, errors + 1)
  }
  https
    .get(
      url,
      {
        headers: { 'accept-encoding': 'gzip,deflate' }
      },
      res => {
        if (res.statusCode >= 300 && res.statusCode <= 399) {
          download(res.headers.location, callback, 0)
        } else if (res.statusCode >= 200 && res.statusCode <= 299) {
          callback(res)
        } else {
          showError(url, res.statusCode)
        }
        res.on('error', onError)
      }
    )
    .on('error', onError)
}

module.exports = async function get(url) {
  return new Promise(resolve => {
    download(url, res => {
      let chunks = []
      res.on('data', i => {
        chunks.push(i)
      })
      res.on('end', () => {
        let buffer = Buffer.concat(chunks)
        if (res.headers['content-encoding'] === 'gzip') {
          zlib.gunzip(buffer, (err, decoded) => {
            if (err) throw err
            resolve(decoded.toString())
          })
        } else if (res.headers['content-encoding'] === 'deflate') {
          zlib.inflate(buffer, (err, decoded) => {
            if (err) throw err
            resolve(decoded.toString())
          })
        } else {
          resolve(buffer.toString())
        }
      })
    })
  })
}
