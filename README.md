# dropbox-client [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/mjackson/dropbox-client/master.svg?style=flat-square
[build]: https://travis-ci.org/mjackson/dropbox-client

[npm-badge]: https://img.shields.io/npm/v/dropbox-client.svg?style=flat-square
[npm]: https://www.npmjs.org/package/dropbox-client

[dropbox-client](https://www.npmjs.com/package/dropbox-client) lets you compose HTTP clients using JavaScript's [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This library has the following goals:

  - Preserve the full capabilities of the fetch API
  - Provide an extendable  middleware API
  - Use the same API on both client and server

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save dropbox-client

Then, use as you would anything else:

```js
// using ES6 modules
import { fetch, createFetch } from 'dropbox-client'

// using CommonJS modules
var fetch = require('dropbox-client').fetch
var createFetch = require('dropbox-client').createFetch
```

In node, dropbox-client automatically uses the [node-fetch](https://github.com/bitinn/node-fetch) library under the hood so no extra configuration is necessary. You'll need to be running node >= 4. Be sure to read about the [known differences](https://github.com/bitinn/node-fetch/blob/master/LIMITS.md) between node-fetch and [the fetch spec](https://fetch.spec.whatwg.org/).

You'll need to shim `window.fetch` in [browsers that do not support it](http://caniuse.com/#feat=fetch) (Safari and IE). [github/fetch](https://github.com/github/fetch) is a great polyfill.

If you're bundling dropbox-client with [webpack](https://webpack.github.io/), you'll want to include the following in your webpack config:

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/node-fetch/),
    new webpack.DefinePlugin({
      'typeof window': JSON.stringify('object')
    })
  ]
}
```

The UMD build is also available on [npmcdn](https://npmcdn.com):

```html
<script src="https://npmcdn.com/dropbox-client/umd/dropbox-client.min.js"></script>
```

You can find the library on `window.DropboxClient`.
