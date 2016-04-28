import './globals'
import expect from 'expect'
import { getMetadata } from '../index'

describe('getMetadata', () => {
  it('uses the correct auth token', () => (
    getMetadata('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    getMetadata('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    getMetadata('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/files/get_metadata')
    })
  ))

  it('puts params in the body', () => (
    getMetadata('token', { path: '/home/pic.jpg' }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params.path).toEqual('/home/pic.jpg')
    })
  ))
})
