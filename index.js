var pull = require('pull-stream')

var Chain = module.exports = function() {
  if (!(this instanceof Chain)) return new Chain()
  this._commands = []
}

Chain.prototype.pull = function() {
  var p = pull.apply(pull, this._commands)
  this._commands=[]
  return p
}

Chain.prototype.add = function() {
  this._commands = this._commands.concat([].slice.call(arguments))
  return this
}

for ( var key in pull) {
  var value = pull[key]
  if (typeof value === 'function') {
    (function(key, value) {
      if (Chain.prototype[key]) return
      Chain.prototype[key] = function() {
        if(key ==="defer")
        return value.apply(pull, [].slice.call(arguments))
        return this.add(value.apply(pull, [].slice.call(arguments)))
      }
    })(key, value)
  }
}