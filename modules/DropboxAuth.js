import { stringify as stringifyQuery } from 'query-string'
import {
  createFetch,
  createStack,
  handleResponse,
  method,
  params,
  parseJSON
} from 'http-client'

export const generateAuthorizeURL = (client_id, redirect_uri, state, force_reapprove = false) =>
  'https://www.dropbox.com/1/oauth2/authorize?' + stringifyQuery({
    response_type: 'code',
    client_id,
    redirect_uri,
    state,
    force_reapprove
  })

const returnJSON = createStack(
  handleResponse(response => {
    const data = response.jsonData

    if (data.error)
      throw new Error(data.error + ': ' + data.error_description)

    return data
  }),
  parseJSON()
)

export const getBearerToken = (client_id, client_secret, code, redirect_uri) => {
  const fetch = createFetch(
    method('POST'),
    params({
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri,
      code
    }),
    returnJSON
  )

  return fetch('https://api.dropboxapi.com/1/oauth2/token').then(
    data => data.access_token
  )
}
