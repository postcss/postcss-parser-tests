let { basename } = require('path')

let get = require('./get')

function findLinks (html, url) {
  let files = html.match(/[^"]+\.css"|[^']\.css'/g)
  if (!files) {
    throw new Error('Can\'t find CSS links at ' + url)
  }

  return files.map(i => {
    let path = i.slice(0, -1)
    if (/^https?:/.test(path)) {
      return path
    } else if (path.startsWith('//')) {
      return 'https:' + path
    } else {
      return path.replace(/^\.?\/?/, url)
    }
  })
}

function wait (spinnies, url) {
  if (!process.env.CI) {
    let text
    if (url.endsWith('.css')) {
      text = basename(url)
    } else {
      text = url.replace(/^https:\/\//, '').replace(/\/$/, '')
    }
    spinnies.add(url, { text })
  }
}

module.exports = async function load (spinnies, succeed, urls, callback) {
  await Promise.all(urls.map(async url => {
    wait(spinnies, url)
    if (url.endsWith('.css')) {
      callback(await get(url), url)
    } else {
      let files = findLinks(await get(url), url)
      succeed(spinnies, url)
      await Promise.all(files.map(async file => {
        wait(spinnies, file)
        callback(await get(file), file)
      }))
    }
  }))
}
