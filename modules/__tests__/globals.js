const globalFetch = (input, options) => {
  // Don't run any response handlers to simplify testing.
  if (options)
    delete options.responseHandlers

  return Promise.resolve({ input, options })
}

global.fetch = globalFetch
