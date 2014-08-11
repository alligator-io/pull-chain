var chain = require('../')
var test = require('tape')

test('find 7', function(t) {
  chain()
  .values([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  .find(
    function(d) {
      return d === 7
    },
    function(err, seven) {
      t.equal(seven, 7)
      t.notOk(err)
      t.end()
  })
  .pull()
})

var target = Math.random()
test('find ' + target, function(t) {
  var f = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
  .map(Math.random)
  f.push(target)
  chain()
  .values(f.sort())
  .find(
  function(d) {
    return d === target
  },
  function(err, found) {
    t.equal(found, target)
    t.notOk(err)
    t.end()
  })
  .pull()
})

test('find missing', function(t) {
  var f = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
  chain()
  .values(f.sort())
  .find(function(d) {
    return d === target
  },
  function(err, found) {
    t.equal(found, null)
    t.notOk(err)
    t.end()
  })
  .pull()
})

test('there can only be one', function(t) {
  chain()
  .values([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  .asyncMap(function(e, cb) {
    process.nextTick(function() {
      cb(null, e)
    })
  })
  .find(
    function(d) {
      return d >= 7
    },
    function(err, seven) {
      t.equal(seven, 7)
      t.notOk(err)
      t.end()
    }
  )
  .pull()
})