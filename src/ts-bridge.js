const path = require('path')
const createDebug = require('debug')

const debug = createDebug('ts-bridge')

require('ts-node').register()
require(path.resolve(__dirname, 'worker'))

// NOTE: ts-node seems to swallow uncaught exceptions,
// and the error event on the worker is never triggered,
// the worker just exits with error code 1.
// Re-throwing the error triggers the worker error event.
process.on('uncaughtException', (err, origin) => {
  debug('Error: Uncaught Exception', err)
  throw err
})
