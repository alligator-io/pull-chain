var chain = require('../')
require('tape')('through - onEnd', function(t) {
  t.plan(2)
  chain()
  .infinite()
  .through(null, function(err) {
    console.log('end')
    t.ok(true)
    process.nextTick(function() {
      t.end()
    })
  })
  .take(10)
  .collect(function(err, ary) {
    console.log(ary)
    t.ok(true)
  })
  .pull()
})