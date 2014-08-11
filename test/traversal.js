var chain = require('../')
var path = require('path')
var fs = require('fs')
var test = require('tape')
var pull = require('pull-stream')
var start = path.resolve(__dirname, '..')

function ls_r(dir) {
  var def = chain().defer()

  fs.readdir(dir, function(err, ls) {
    if (err) return def.abort(err.code === 'ENOTDIR' ? true : err)

    def.resolve(
      chain().values(ls || [])
      .map(function(file) {
        return path.resolve(dir, file)
      })
      .pull()
    )
  })

  return def
}

test('widthFirst', function(t) {
  var max = 0, didStart

  chain()
  .widthFirst(start, ls_r).map(function(file) {
    if (file === start) didStart = true
    return file.split('/').length
  })
  .filter(function(d) {
    t.ok(d >= max)
    if (d > max) return max = d, true
  })
  .through(console.log).drain(null, function() {
    t.ok(didStart)
    t.end()
  })
  .pull()

})

test('depthFirst', function(t) {
  var seen = {}
  chain()
  .depthFirst(start, ls_r)
  .through(function(file) {
    if (file != start) {
      var dir = path.dirname(file)
      t.ok(seen[dir])
    }
    seen[file] = true
  })
  .onEnd(function() {
    t.end()
  })
  .pull()
})

test('leafFirst', function(t) {
  var seen = {}
  var expected = {}
  expected[start] = true

  chain()
  .leafFirst(start, ls_r)
  .through(function(file) {
    if (file !== start) {
      var dir = path.dirname(file)
      t.ok(!seen[dir])
      expected[dir] = true
    }
    if (expected[file]) delete expected[file]
  })
  .drain(null, function() {
    for ( var k in expected)
      t.ok(false, k)
    t.end()
  })
  .pull()
})