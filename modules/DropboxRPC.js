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

const postJSON = (token, path, payload) =>
  createFetch(
    bearerToken(token),
    apiVersion(2),
    method('POST'),
    json(payload),
    returnJSON
  )(path)

export const copy = (token, from_path, to_path) =>
  postJSON(token, '/files/copy', { from_path, to_path })

export const createFolder = (token, path) =>
  postJSON(token, '/files/create_folder', { path })

export const getMetadata = (token, path, include_media_info = false, include_deleted = false) =>
  postJSON(token, '/files/get_metadata', { path, include_media_info, include_deleted })

export const listFolder = (token, path, recursive = false, include_media_info = false, include_deleted = false) =>
  postJSON(token, '/files/list_folder', { path, recursive, include_media_info, include_deleted })

export const listFolderContinue = (token, cursor) =>
  postJSON(token, '/files/list_folder/continue', { cursor })

export const getAccount = (token, account_id) =>
  postJSON(token, '/users/get_account', { account_id })

export const getAccountBatch = (token, account_ids) =>
  postJSON(token, '/users/get_account_batch', { account_ids })

export const getCurrentAccount = (token) =>
  createFetch(
    bearerToken(token),
    apiVersion(2),
    method('POST'),
    returnJSON
  )('/users/get_current_account')

export const getSpaceUsage = (token) =>
  createFetch(
    bearerToken(token),
    apiVersion(2),
    method('POST'),
    returnJSON
  )('/users/get_space_usage')
