import './globals'
import expect from 'expect'
import { listFolder } from '../index'

describe('listFolder', () => {
  it('uses the correct auth token', () => (
    listFolder('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    listFolder('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    listFolder('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/files/list_folder')
    })
  ))

  it('puts params in the body', () => (
    listFolder('token', { path: '/home' }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params.path).toEqual('/home')
    })
  ))
})
