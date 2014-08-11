var chain = require('../')
var test = require('tape')
var pull = require('pull-stream')

test('flatten arrays', function(t) {
  chain()
  .values([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ])
  .flatten()
  .collect(
    function(err, numbers) {
      t.deepEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], numbers)
      t.end()
    }
  )
  .pull()
})

test('flatten stream of streams', function(t) {
  chain().values([
    pull.values([ 1, 2, 3 ]),
    pull.values([ 4, 5, 6 ]),
    pull.values([ 7, 8, 9 ]) ]
  )
  .flatten()
  .collect(function(err, numbers) {
    t.deepEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], numbers)
    t.end()
  })
  .pull()
})