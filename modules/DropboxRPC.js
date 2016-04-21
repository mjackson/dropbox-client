import {
  createFetch,
  createStack,
  auth,
  base,
  json,
  method,
  handleResponse,
  parseJSON
} from 'http-client'

const bearerToken = (token) =>
  auth('Bearer ' + token)

const apiVersion = (version) =>
  base('https://api.dropboxapi.com/' + version)

const returnJSON = createStack(
  handleResponse(response => {
    const data = response.jsonData

    if (data.error_summary)
      throw new Error(data.error_summary)

    return data
  }),
  parseJSON()
)

const post = (token, path) =>
  createFetch(
    method('POST'),
    bearerToken(token),
    apiVersion(2),
    returnJSON
  )(path)

const postParams = (token, path, params) =>
  createFetch(
    method('POST'),
    bearerToken(token),
    apiVersion(2),
    json(params),
    returnJSON
  )(path)

export const copy = (token, params = {}) =>
  postParams(token, '/files/copy', params)

export const createFolder = (token, params = {}) =>
  postParams(token, '/files/create_folder', params)

export const getMetadata = (token, params = {}) =>
  postParams(token, '/files/get_metadata', params)

export const listFolder = (token, params = {}) =>
  postParams(token, '/files/list_folder', params)

export const listFolderContinue = (token, params = {}) =>
  postParams(token, '/files/list_folder/continue', params)

export const getAccount = (token, params = {}) =>
  postParams(token, '/users/get_account', params)

export const getAccountBatch = (token, params = {}) =>
  postParams(token, '/users/get_account_batch', params)

export const getCurrentAccount = (token) =>
  post(token, '/users/get_current_account')

export const getSpaceUsage = (token) =>
  post(token, '/users/get_space_usage')
