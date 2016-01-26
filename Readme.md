UriP
----

# Synopsis

Simple JS library to work with query strings and URIs

# Usage

## Build query string

```javascript
const queryObj = {
  meaningOfLife: 42,
  shit: 'brix',
  selectAll: true
};
const queryStr = UriP.serializeQuery(queryObj)
console.log(JSON.stringify(queryStr))
// { meaningOfLife: '42', shit: 'brix', selectAll: 'true' }
```

## Decode URI with query string

```javascript
const complexUri = 'http://search.lycos.com/web/?q=wow+remember+this+shit&keyvol=0084afc23d680d2c5ff1'
const readUri = UriP.read(complexUri)
console.log(JSON.stringify(readUri))
```

## Decode just the query string

```javascript
const uri = '?q=wow+remember+this+shit&keyvol=0084afc23d680d2c5ff1'
const queryObj = UriP.readQuery(uri)
console.log(JSON.stringify(queryObj)) // { q: 'wow remember this shit', keyvol: '0084afc23d680d2c5ff1' }
```

# TODO

## Compile URI with query string

```javascript
const UriP = require('UriP')

var query = {
  account: 243922,
  listAll: true,
  limit: 15
}

var reqUri = UriP.build("http://localhost:3030", query)
console.log(reqUri)
// http://localhost:3030/?account=243922&listAll=true&limit=15
```

