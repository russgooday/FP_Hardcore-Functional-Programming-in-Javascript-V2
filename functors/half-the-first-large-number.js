// Our original procedural script
const first = ([xs]) => xs

const halfTheFirstLargeNumber_ = xs => {
  const found = xs.filter(x => x >= 20)
  const answer = first(found) / 2
  return `The answer is ${answer}`
}

const result = halfTheFirstLargeNumber_([1, 4, 50])
console.log(result)

// Challenge to use an identity functor instead
const { Box } = require('./helpers/box')

const halfTheFirstLargeNumber = nums =>
  Box(nums)
    .map(xs => xs.filter(x => x >= 20))
    .map(found => first(found) / 2)
    .fold(answer => `The answer is ${answer}`)

console.log(halfTheFirstLargeNumber([1, 22, 50])) // The answer is 25
console.assert(
  halfTheFirstLargeNumber([1, 22, 50]) === 'The answer is 11',
  "halfTheFirstLargeNumber([1, 22, 50]) === 'The answer is 11'"
)
