let get = require('./get')

function findLinks(html, url) {
  let files = html.match(/[^"]+\.css"|[^']\.css'/g)
  if (!files) {
    throw new Error("Can't find CSS links at " + url)
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

module.exports = async function load(succeed, urls, callback) {
  let used = new Set()
  await Promise.all(
    urls.map(async url => {
      used.add(url)
      if (url.endsWith('.css')) {
        callback(await get(url), url)
      } else {
        let files = findLinks(await get(url), url)
        succeed(url)
        await Promise.all(
          files.map(async file => {
            if (used.has(file)) return
            used.add(file)
            callback(await get(file), file)
          })
        )
      }
    })
  )
}
