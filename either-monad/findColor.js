// Either Monads

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => f(x),
  toString: `Right(${x})`
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => g(x),
  toString: `Left(${x})`
})

/*
  Breakdown:

  We have fold methods on both Left and Right that take the same two arguments, Right calling and
  returning the first, and Left returning the second

  Left gives us a monad that we can use to handle errors in a way that doesn't break the chaining code.

  Left's chain and map are essentially dummy functions that just return the Boxed object, letting the
  erroneous data pass through the chain — bubbling up to the caller

  The functionality is similar in a way to 'resolve' and 'reject' passing the responsibility
  for error handling to the caller

  See below for an example
*/

// helper
const fromNullable = x =>
  x != null ? Right(x) : Left()

const findColor = name =>
  fromNullable({
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f'
  }[name])

const result = (color) =>
  findColor(color)
    .map(x => x.toUpperCase())
    .map(x => x.slice(1))
    .fold(
      color => color, // from Right
      err => `Color ${err}` // from Left
    )

console.log(result('redd')) // Problem: color missing
console.log(result('blue')) // 3B5998
