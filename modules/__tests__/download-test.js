import './globals'
import expect from 'expect'
import { download } from '../index'

describe('download', () => {
  it('uses the correct auth token', () => (
    download('token', { path: '/home' }).then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    download('token', { path: '/home' }).then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    download('token', { path: '/home' }).then(({ input }) => {
      expect(input).toEqual('https://content.dropboxapi.com/2/files/download')
    })
  ))

  it('puts params in the correct header', () => (
    download('token', { path: '/home' }).then(({ options }) => {
      const params = JSON.parse(options.headers['Dropbox-API-Arg'])
      expect(params).toEqual({ path: '/home' })
    })
  ))
})
