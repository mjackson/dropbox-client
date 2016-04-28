import './globals'
import expect from 'expect'
import { parse as parseQuery } from 'query-string'
import { getBearerToken } from '../index'

describe('getBearerToken', () => {
  it('uses the correct HTTP method', () => (
    getBearerToken('id', 'secret', 'code', 'uri').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct content', () => (
    getBearerToken('id', 'secret', 'code', 'uri').then(({ options }) => {
      expect(parseQuery(options.body)).toEqual({
        client_id: 'id',
        client_secret: 'secret',
        grant_type: 'authorization_code',
        redirect_uri: 'uri',
        code: 'code'
      })
    })
  ))

  it('uses the correct endpoint', () => (
    getBearerToken('id', 'secret', 'code', 'uri').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/1/oauth2/token')
    })
  ))
})
