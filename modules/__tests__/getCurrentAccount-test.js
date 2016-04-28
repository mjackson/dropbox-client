import './globals'
import expect from 'expect'
import { getCurrentAccount } from '../index'

describe('getCurrentAccount', () => {
  it('uses the correct auth token', () => (
    getCurrentAccount('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  ))

  it('uses the correct HTTP method', () => (
    getCurrentAccount('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    getCurrentAccount('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/users/get_current_account')
    })
  ))
})
