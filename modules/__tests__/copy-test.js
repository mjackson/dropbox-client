import expect from 'expect'
import { copy } from '../index'

describe('copy', () => {
  it('uses the correct auth token', () => {
    copy('token').then(({ options }) => {
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  })

  it('uses the correct HTTP method', () => (
    copy('token').then(({ options }) => {
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    copy('token').then(({ input }) => {
      expect(input).toEqual('https://api.dropboxapi.com/2/files/copy')
    })
  ))

  it('puts params in the body', () => (
    copy('token', { from_path: '/from', to_path: '/to' }).then(({ options }) => {
      const params = JSON.parse(options.body)
      expect(params).toEqual({
        from_path: '/from',
        to_path: '/to'
      })
    })
  ))
})
