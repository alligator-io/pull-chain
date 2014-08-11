var chain = require('../')

require('tape')('async-map', function(t) {
  chain()
  .count()
  .take(21)
  .asyncMap(function(data, cb) {
    return cb(null, data + 1)
  })
  .collect(function(err, ary) {
    console.log(ary)
    t.equal(ary.length, 21)
    t.end()
  })
  .pull()
})

require('tape')('para-map', function(t) {
  var n = 0, m = 0, w = 6, i = 0

  chain()
  .count()
  .take(21)
  .paraMap(function(data, cb) {
    console.log('>', i++)
    n++
    m = Math.max(m, n)
    setTimeout(function() {
      n--

      console.log('<')
      cb(null, data + 1)
    }, Math.random() * 20)
  }, w)
  .collect(function(err, ary) {
    console.log(ary)
    t.equal(ary.length, 21)
    t.equal(m, w)
    t.end()
  })
  .pull()
})