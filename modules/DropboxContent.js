import {
  createFetch,
  createStack,
  auth,
  base,
  body,
  header,
  handleResponse,
  method
} from 'http-client'

const bearerToken = (token) =>
  auth('Bearer ' + token)

const apiVersion = (version) =>
  base('https://content.dropboxapi.com/' + version)

const apiArgs = (args) =>
  header('Dropbox-API-Arg', JSON.stringify(args))

const apiResult = (propertyName = 'apiResult') =>
  handleResponse(response => {
    const result = response.headers.get('Dropbox-API-Result')

    if (result)
      response[propertyName] = JSON.parse(result)

    return response
  })

const returnFile = createStack(
  handleResponse(response => ({
    metadata: response.apiResult,
    content: response.body
  })),
  apiResult()
)

const getFile = (token, path, args) =>
  createFetch(
    method('POST'),
    bearerToken(token),
    apiVersion(2),
    apiArgs(args),
    returnFile
  )(path)

const putFile = (token, content, contentType, path, args) =>
  createFetch(
    method('POST'),
    bearerToken(token),
    apiVersion(2),
    apiArgs(args),
    body(content, contentType)
  )(path)

export const download = (token, params = {}) =>
  getFile(token, '/files/download', params)

export const getPreview = (token, params = {}) =>
  getFile(token, '/files/get_preview', params)

export const getThumbnail = (token, params = {}) =>
  getFile(token, '/files/get_thumbnail', params)

export const upload = (token, content, contentType = 'application/octet-stream', params = {}) =>
  putFile(token, content, contentType, '/files/upload', params)
