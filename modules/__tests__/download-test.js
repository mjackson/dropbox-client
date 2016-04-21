import './globals'
import expect from 'expect'
import { download } from '../index'

// HACK: Our test harness sends back request args in
// response.body, which is put on file.content so we
// can assert on them.
const getRequestArgs = (file) =>
  file.content

describe('download', () => {
  it('uses the correct auth token', () => {
    download('token', { path: '/home' }).then(file => {
      const { options } = getRequestArgs(file)
      expect(options.headers.Authorization).toEqual('Bearer token')
    })
  })

  it('uses the correct HTTP method', () => (
    download('token', { path: '/home' }).then(file => {
      const { options } = getRequestArgs(file)
      expect(options.method).toEqual('POST')
    })
  ))

  it('uses the correct endpoint', () => (
    download('token', { path: '/home' }).then(file => {
      const { input } = getRequestArgs(file)
      expect(input).toEqual('https://content.dropboxapi.com/2/files/download')
    })
  ))

  it('puts params in the correct header', () => (
    download('token', { path: '/home' }).then(file => {
      const { options } = getRequestArgs(file)
      const params = JSON.parse(options.headers['Dropbox-API-Arg'])
      expect(params).toEqual({ path: '/home' })
    })
  ))
})
