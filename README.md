pull-chain
============
Chaining for pull-stream functions.

## Example
```javascript
var chain=require('pull-chain')

chain()
.values([1, 2, 3, 4])
.map(function(m){ return m*10 })
.collect(function(err, data){
  console.log(err,data)
})
.pull()
```

## License

MIT