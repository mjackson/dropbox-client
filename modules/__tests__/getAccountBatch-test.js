import './globals'
import expect from 'expect'
import { getAccountBatch } from '../index'

describe('getAccountBatch', () => {
  it('uses the correct auth token', () => (
    getAccountBatch('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    getAccountBatch('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    getAccountBatch('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/users/get_account_batch')
    })
  ))

  it('puts params in the body', () => (
    getAccountBatch('token', { account_ids: [ '1', '2', '3' ] }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params.account_ids).toEqual([ '1', '2', '3' ])
    })
  ))
})
