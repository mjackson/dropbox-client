# dropbox-client [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/mjackson/dropbox-client/master.svg?style=flat-square
[build]: https://travis-ci.org/mjackson/dropbox-client

[npm-badge]: https://img.shields.io/npm/v/dropbox-client.svg?style=flat-square
[npm]: https://www.npmjs.org/package/dropbox-client

[dropbox-client](https://www.npmjs.com/package/dropbox-client) is a client for the [Dropbox API v2](https://www.dropbox.com/developers).

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save dropbox-client

dropbox-client requires you to bring your own [global `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) function. [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) is a great polyfill.

Then, use as you would anything else:

```js
// using ES6 modules
import { getFile } from 'dropbox-client'

// using CommonJS modules
var getFile = require('dropbox-client').getFile
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/dropbox-client/umd/dropbox-client.min.js"></script>
```

You can find the library on `window.DropboxClient`.
