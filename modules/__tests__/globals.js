const globalFetch = (input, options) => {
  // Don't run any response handlers. This simplifies testing.
  if (options)
    delete options.responseHandlers

  return Promise.resolve({ input, options })
}

if (typeof self === 'object')
  self.fetch = globalFetch
else if (typeof global === 'object')
  global.fetch = globalFetch
