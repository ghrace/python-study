Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let self = this
  let args = [...this.arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, args.concat(...arguments))
  }
}

Function.prototype.myCall = function (context) {
  let context = context || window
  context.fn = this
  let args = [...this.arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myApply = function (context) {
  let context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {

    result = context.fn()
  }
  delete context.fn
  return result
}
