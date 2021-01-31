// Setup
//= =============
const _ = require('ramda')

const { formatMoney } = require('accounting')

// Example Data
const CARS = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.

const isLastInStock = _.compose(_.prop('in_stock'), _.last)

console.log('isLastInStock', isLastInStock(CARS))
console.assert(isLastInStock(CARS) === false, 'last car is not in stock')

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = _.compose(_.prop('name'), _.head)

console.log('nameOfFirstCar', nameOfFirstCar(CARS))
console.assert(nameOfFirstCar(CARS) === 'Ferrari FF', 'name of first car is Ferrari FF')

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function (xs) { return _.reduce(_.add, 0, xs) / xs.length } // <- leave be

const averageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')))

console.log('Ex3: averageDollarValue', averageDollarValue(CARS))
console.assert(averageDollarValue(CARS) === 790700, 'average dollar value of cars is 790700')

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = _.replace(/\W+/g, '_') // <-- leave this alone and use to sanitize

// The original idea/workings
const sanitizeNames_ = _.compose(_.map(_underscore), _.map(_.toLower), _.map(_.prop('name')))

// there's a few maps there, so obviously there is room for refactoring and what we have is distibutive e.g.
// (x * y) + (x * z) = x(y + z) so ...

const sanitizeNames = _.map(_.compose(_underscore, _.toLower, _.prop('name')))

console.log('Ex4: sanitizeNames', sanitizeNames(CARS))
console.assert(
  _.difference(
    sanitizeNames(CARS),
    ['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra']
  ).length === 0,
  "sanitizeNames = ['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra']"
)

// Bonus 1:
// ============
// Refactor availablePrices with compose.

// we can think about nesting our compositions
const formatDollarValue = _.compose(formatMoney, _.prop('dollar_value'))

const availablePrices = _.compose(
  _.join(', '),
  _.map(formatDollarValue),
  _.filter(_.prop('in_stock'))
)

console.log('Bonus 1: availablePrices', availablePrices(CARS))
console.assert(
  availablePrices(CARS) === '$700,000.00, $1,850,000.00',
  "availablePrices(CARS) = '$700,000.00, $1,850,000.00'"
)

// Bonus 2:
// ============
// Refactor to pointfree.

const fastestCar = _.compose(
  _.concat(_.__, ' is the fastest'),
  _.prop('name'),
  _.last,
  _.sortBy(_.prop('horsepower'))
)

console.log('Bonus 2: fastestCar', fastestCar(CARS))
console.assert(
  fastestCar(CARS) === 'Aston Martin One-77 is the fastest',
  "fastestCar(CARS) = 'Aston Martin One-77 is the fastest'"
)
