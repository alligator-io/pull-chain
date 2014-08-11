var chain = require('../')
var test = require('tape')

test('join through streams with pipe', function(t) {

  var pipeline = chain()
  .map(function(d) {
    return d + '!'
  })
  .map(function(d) {
    return d.toUpperCase()
  })
  .map(function(d) {
    return '*** ' + d + ' ***'
  })
  .pull()

  t.equal('function', typeof pipeline)
  t.equal(1, pipeline.length)

  var read = chain()
  .readArray([ 'billy', 'joe', 'zeke' ])
  .add(pipeline)
  .pull()

  t.equal('function', typeof read)
  t.equal(2, read.length)

  chain()
  .add(read)
  .writeArray(function(err, array) {
    console.log(array)
    t.deepEqual(array, [ '*** BILLY! ***', '*** JOE! ***', '*** ZEKE! ***' ])
    t.end()
  })
  .pull()

})