import './globals'
import expect from 'expect'
import { listFolderContinue } from '../index'

describe('listFolderContinue', () => {
  it('uses the correct auth token', () => (
    listFolderContinue('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    listFolderContinue('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    listFolderContinue('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/files/list_folder/continue')
    })
  ))

  it('puts params in the body', () => (
    listFolderContinue('token', { cursor: 'abc' }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params.cursor).toEqual('abc')
    })
  ))
})
