

var chain = require('../')
var test = require('tape')

test('unique', function (t) {
  var numbers = [1, 2, 2, 3, 4, 5, 6, 4, 0, 6, 7, 8, 3, 1, 2, 9, 0]

  chain()
  .values(numbers)
  .unique()
  .collect(function (err, ary) {
      t.deepEqual(ary.sort(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      t.end()
    }
  )
  .pull()

})

test('non-unique', function (t) {
  var numbers = [1, 2, 2, 3, 4, 5, 6, 4, 0, 6, 7, 8, 3, 1, 2, 9, 0]

  chain()
   .values(numbers)
   .nonUnique()
   .collect(function (err, ary) {
      t.deepEqual(ary.sort(), [0, 1, 2, 2, 3, 4, 6])
      t.end()
    }
  )
  .pull()

})