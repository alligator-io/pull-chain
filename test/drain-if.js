var chain = require('../')
var test = require('tape')

test('reduce becomes through', function(t) {
  chain()
  .values([ 1, 2, 3 ])
  .reduce(function(a, b) {
    return a + b
  },0)
  .through(console.log)
  .collect(function(err, ary) {
    t.equal(ary[0], 6)
    t.end()
  })
  .pull()
})

test('reduce becomes drain', function(t) {
  chain()
  .values([ 1, 2, 3 ])
  .reduce(function(a, b) {
    return a + b
  },
  0,
  function(err, acc) {
    t.equal(acc, 6)
    t.end()
  })
  .pull()
})