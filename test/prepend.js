var chain = require('../')

chain()
.values([1, 2, 3])
.prepend(0)
.collect(function (err, ary) {
  console.log(ary)
})
.pull()