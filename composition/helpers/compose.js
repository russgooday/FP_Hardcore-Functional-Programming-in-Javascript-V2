const compose = (...funcs) => initVal => (
  funcs.reduceRight((value, func) => func(value), initVal)
)

const pipe = (...funcs) => initVal => (
  funcs.reduce((value, func) => func(value), initVal)
)

const deMethodize = fn => (obj, ...args) => fn.apply(obj, args)

module.exports = { compose, pipe, deMethodize }
