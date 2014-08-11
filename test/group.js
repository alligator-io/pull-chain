var chain = require('../')
var test = require('tape')

process.on('uncaughtException', function(err) {
  console.error(err.stack)
})

test('group', function(t) {
  chain()
  .count()
  .take(20)
  .group(7)
  .group(3)
  .add(function(read) {
    return function(end, cb) {
      read(null, function(end, data) {
        if (!end) {
          t.deepEqual(
            data,
            [ [ 0, 1, 2, 3, 4, 5, 6 ],
            [ 7, 8, 9, 10, 11, 12, 13 ],
            [ 14, 15, 16, 17, 18, 19 ] ]
          )
          console.log(data)
        }

        process.nextTick(cb.bind(null, end, data))
      })
    }
  })
  .drain(null, function(err) {
    t.notOk(err)
    t.end()
  })
  .pull()
})

test('flatten (ungroup)', function(t) {
  chain()
  .count()
  .take(20)
  .group(7)
  .group(3)
  .through(console.log)
  .flatten()
  .through(console.log)
  .flatten()
  .collect(
    function(err, ary) {
      t.notOk(err)
      console.log(ary)
      t.deepEqual(
        ary,
        [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19 ]
      )
      t.end()
    })
    .pull()
})