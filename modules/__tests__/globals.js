const contentStub = (input, options) => {
  // Content methods try to read the Dropbox-API-Result
  // header in the response.
  const headers = {}

  return {
    headers: {
      get: (headerName) => headers[headerName]
    },
    body: {
      input,
      options
    }
  }
}

const apiStub = (input, options) => {
  // RPC methods return the JSON in the request, so pass
  // input and options through so we can assert on them.
  const json = { input, options }

  return {
    json: () => Promise.resolve(json)
  }
}

const fetchStub = (input, options) => {
  let response
  if (input.indexOf('https://content.dropboxapi.com/2/files/upload') === 0) {
    response = { input, options }
  } else if (input.indexOf('https://content.dropboxapi.com') === 0) {
    response = contentStub(input, options)
  } else if (input.indexOf('https://api.dropboxapi.com') === 0) {
    response = apiStub(input, options)
  } else {
    response = { input, options }
  }

  return Promise.resolve(response)
}

if (typeof self === 'object')
  self.fetch = fetchStub
else if (typeof global === 'object')
  global.fetch = fetchStub
