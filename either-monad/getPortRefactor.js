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

const fromNullable = x =>
  x != null ? Right(x) : Left()
