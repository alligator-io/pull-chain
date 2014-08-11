var chain = require('../')
var test = require('tape')

test('through - onEnd', function(t) {
  t.plan(2)
  var values = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
  chain()
  .values(values)
  .take(10)
  .through(null, function(err) {
    console.log('end')
    t.ok(true)
    process.nextTick(function() {
      t.end()
    })
  })
  .collect(function(err, ary) {
    console.log(ary)
    t.ok(true)
  })
  .pull()
})

test('take 5', function(t) {
  chain()
  .values([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  .take(5)
  .collect(function(err, five) {
    t.deepEqual(five, [ 1, 2, 3, 4, 5 ])
    t.end()
  })
  .pull()
})