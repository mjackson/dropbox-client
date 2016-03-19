import {
  createFetch,
  createStack,
  auth,
  base,
  body,
  header,
  handleResponse
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
    bearerToken(token),
    apiVersion(2),
    apiArgs(args),
    returnFile
  )(path)

const putFile = (token, content, contentType, path, args) =>
  createFetch(
    bearerToken(token),
    apiVersion(2),
    apiArgs(args),
    body(content, contentType)
  )(path)

export const download = (token, path) =>
  getFile(token, '/files/download', { path })

export const getPreview = (token, path) =>
  getFile(token, '/files/get_preview', { path })

export const getThumbnail = (token, path, format = 'jpeg', size = 'w64h64') =>
  getFile(token, '/files/get_thumbnail', { path, format, size })

export const upload = (token, content, contentType = 'application/octet-stream', mode = 'add', autorename = false, client_modified = undefined, mute = false) =>
  putFile(token, content, contentType, '/files/upload', { mode, autorename, client_modified, mute })
