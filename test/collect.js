var chain = require('../')
var test = require('tape')

test('collect empty', function(t) {
  chain()
  .empty()
  .collect(function(err, ary) {
    t.notOk(err)
    t.deepEqual(ary, [])
    t.end()
  })
  .pull()
})