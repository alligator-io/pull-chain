var test = require('tape')
var chain = require('../')

test('concat', function(t) {
  var n = 0
  chain()
  .values('hello there this is a test'.split(/([aeiou])/))
  .through(function() {
    n++
  })
  .concat(function(err, mess) {
    t.equal(mess, 'hello there this is a test')
    t.equal(n, 17)
    t.end()
  })
  .pull()
})