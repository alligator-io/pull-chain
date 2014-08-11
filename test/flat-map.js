var chain = require('../')
var tape = require('tape')

tape('flat-map', function(t) {
  chain()
  .count(6)
  .flatMap(function(n) {
    var a = [ n ]

    while (n && !(n & 1)) {
      n = n >> 1
      a.push(n)
    }

    return a
  })
  .collect(function(err, ary) {
    if (err) throw err
    t.deepEqual(ary, [ 0, 1, 2, 1, 3, 4, 2, 1, 5, 6, 3 ])
    t.end()
  })
  .pull()
})

tape('unpack', function(t) {
  chain()
  .values([ [ 1, 2, 3 ], [], [], [ 4, 5, 6 ], [] ])
  .flatMap()
  .collect(
    function(err, ary) {
      if (err) throw err
      t.deepEqual(ary, [ 1, 2, 3, 4, 5, 6 ])
      t.end()
    }
  )
  .pull()
})