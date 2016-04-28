import './globals'
import expect from 'expect'
import { getAccount } from '../index'

describe('getAccount', () => {
  it('uses the correct auth token', () => (
    getAccount('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    getAccount('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    getAccount('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/users/get_account')
    })
  ))

  it('puts params in the body', () => (
    getAccount('token', { account_id: '1' }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params.account_id).toEqual('1')
    })
  ))
})
