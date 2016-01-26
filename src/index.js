'use strict'

function serializeQuery (queryObj) {
  return '?' + Object.keys(queryObj)
    .reduce(function (r, q) {
      r.push(encodeURIComponent(q) + '=' + encodeURIComponent(queryObj[q]))
      return r
    }, [])
    .join('&')
}

function readQuery (queryStr_) {
  let queryStr = queryStr_[0] === '?' ? queryStr_.slice(1) : queryStr_
  return queryStr.split('&')
  .map(function (n) {
    return n.split('=')
  })
  .reduce(function (x, y) {
    return Object.assign(x, {
      [decodeURIComponent(y[0])]: decodeURIComponent(y[1] || '')
    })
  }, {})
}

function read (str, options_) {
  // http://blog.stevenlevithan.com/archives/parseuri
  const options = options_ || read.options
  let o = options
  var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str)
  var uri = {}
  var i = 14

  while (i--) uri[o.key[i]] = m[i] || ''

  uri[o.q.name] = {}
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2
  })

  return uri
}

read.options = {
  // http://blog.stevenlevithan.com/archives/parseuri
  strictMode: false,
  key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
  q: {
    name: 'queryKey',
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
}

module.exports = { serializeQuery, read, readQuery }
