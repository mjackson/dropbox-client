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
      const query = parseQuery(options.body)

      expect(query.client_id).toEqual('id')
      expect(query.client_secret).toEqual('secret')
      expect(query.grant_type).toEqual('authorization_code')
      expect(query.redirect_uri).toEqual('uri')
      expect(query.code).toEqual('code')
    })
  ))

  it('uses the correct endpoint', () => (
    getBearerToken('id', 'secret', 'code', 'uri').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/1/oauth2/token')
    })
  ))
})
