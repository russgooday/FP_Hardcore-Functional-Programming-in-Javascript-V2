// Our original method.
// The challenge being to somehow chain the
// procedures using a functor
const nextCharForNumberString_ = str => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}

console.log(nextCharForNumberString_('   64')) // A

/**
 * Box Functor in Longform a.k.a Identity Functor
 * @param {Value} x
 * @returns {Object} with atleast a map method
 */
function Box_ (x) {
  return {
    // The returned Box object.map retains a reference to 'x' in a closure.
    // On being invoked with a function argument, that function is in turn
    // called on 'x'.
    // The return value is passed to a new Box and a new Box object is returned.
    map: function (f) {
      return Box_(f(x))
    },
    // As with map Box object.fold retains 'x' in a closure
    // This time the function argument is invoked on 'x' and the value is
    // immediately returned (No Box!)
    fold: function (f) {
      return f(x)
    }
  }
}

// Box in short form
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x)
})

// nextCharForNumberString using Box.

// We have now succeeded in chaining our previously
// un-chainable and disconnected procedures.
// The initial value flows through the chain
// passing each result on to the next method.
// We avoid creating uneccessary exposed state e.g. our disconnected variables
// The state is contained through composure.
const result = Box('     64')
  .map(str => str.trim())
  .map(trimmed => parseInt(trimmed, 10))
  .map(number => number + 1)
  .fold(nextNumber => String.fromCharCode(nextNumber))

console.log(result) // A
