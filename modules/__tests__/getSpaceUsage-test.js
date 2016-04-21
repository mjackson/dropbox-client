import './globals'
import expect from 'expect'
import { getSpaceUsage } from '../index'

describe('getSpaceUsage', () => {
  it('uses the correct auth token', () => {
    getSpaceUsage('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  })

  it('uses the correct HTTP method', () => (
    getSpaceUsage('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    getSpaceUsage('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/users/get_space_usage')
    })
  ))
})
