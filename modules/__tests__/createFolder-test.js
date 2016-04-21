import './globals'
import expect from 'expect'
import { createFolder } from '../index'

describe('createFolder', () => {
  it('uses the correct auth token', () => {
    createFolder('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  })

  it('uses the correct HTTP method', () => (
    createFolder('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    createFolder('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/files/create_folder')
    })
  ))

  it('puts params in the body', () => (
    createFolder('token', { path: '/home' }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params.path).toEqual('/home')
    })
  ))
})
