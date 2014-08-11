var test = require('tape')
var chain = require('../')

test('filtered randomnes', function(t) {
  chain()
  .infinite()
  .filter(function(d) {
    console.log('f', d)
    return d > 0.5
  })
  .take(100).writeArray(function(err, array) {
    t.equal(array.length, 100)
    array.forEach(function(d) {
      t.ok(d > 0.5)
      t.ok(d <= 1)
    })
    console.log(array)
    t.end()
  })
  .pull()
})

test('filter with regexp', function(t) {
  chain()
  .infinite()
  .map(function(d) {
    return Math.round(d * 1000).toString(16)
  })
  .filter(/^[^e]+$/i)
  .take(37)
  .writeArray(function(err, array) {
    t.equal(array.length, 37)
    console.log(array)
    array.forEach(function(d) {
      t.equal(d.indexOf('e'), -1)
    })
    t.end()
  })
  .pull()
})

test('inverse filter with regexp', function(t) {
  chain()
  .infinite()
  .map(function(d) {
    return Math.round(d * 1000).toString(16)
  })
  .filterNot(/^[^e]+$/i)
  .take(37)
  .writeArray(function(err, array) {
    t.equal(array.length, 37)
    console.log(array)
    array.forEach(function(d) {
      t.notEqual(d.indexOf('e'), -1)
    })
    t.end()
  })
  .pull()
})