var tape = require('tape')
var chain = require('../')

tape('map throughs ends stream', function (t) {
  var err = new Error('unwholesome number')
  chain()
  .values([1,2,3,3.4,4])
  .map(function (e) {
    if(e !== ~~e)
      throw err
  })
  .drain(null, function (_err) {
    t.equal(_err, err)
    t.end()
  })
  .pull()
})