const { compose, deMethodize } = require('./helpers/compose.js')

const log = label => x => (console.log(`${label}:`, x), x)

const trim = deMethodize(String.prototype.trim)

const toUpperCase = deMethodize(String.prototype.toUpperCase)

const shout = strg => `${strg}!`

console.log(compose(shout, toUpperCase, log('trimmed'), trim)(' test string    '))
