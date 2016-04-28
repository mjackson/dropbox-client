import './globals'
import expect from 'expect'
import { upload } from '../index'

describe('upload', () => {
  it('uses the correct auth token', () => (
    upload('token', 'content').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    upload('token', 'content').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    upload('token', 'content').then(({ input }) => {
      expect(input).toEqual('https://content.dropboxapi.com/2/files/upload')
    })
  ))

  it('sets the correct Content-Type header', () => (
    upload('token', 'content', 'text/plain').then(({ options }) => {
      expect(options.headers['Content-Type']).toEqual('text/plain')
    })
  ))

  it('sets the correct body', () => (
    upload('token', 'content').then(({ options }) => {
      expect(options.body).toEqual('content')
    })
  ))

  it('puts params in the correct header', () => (
    upload('token', 'content', 'content/type', { mode: 'add' }).then(({ options }) => {
      const params = JSON.parse(options.headers['Dropbox-API-Arg'])
      expect(params.mode).toEqual('add')
    })
  ))
})
