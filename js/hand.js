function create() {
    let obj = new Object()
    //构造函数
    console.log(arguments)
    let con = [].shift.call(arguments)
    console.log(con)
    obj.__proto__ = con.prototype

    let result = con.apply(obj, arguments)

    return typeof result === 'object' ? result : obj
}
function instan(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while (1) {
        if (left === null) {
            return false
        }
        if (prototype === left) {
            return true
        }
        left = left.__proto__
    }
}

Function.prototype.myCall = function (ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    let args = [...arguments].slice(1)
    let result = ctx.fn(...args)
    Reflect.deleteProperty(ctx, 'fn')
    return result
}

Function.prototype.myApply = function (ctx) {
    ctx = ctx || window
    ctx.fn = this
    let result
    if (arguments[1]) {
        result = ctx.fn(...arguments[1])
    } else {
        result = ctx.fn()
    }
    Reflect.deleteProperty(ctx, 'fn')
    return result
}

Function.prototype.bind = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    let _this = this
    let args = [...arguments].slice(1)
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(ctx, args.concat(...arguments))
    }
}

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function Mypromie(fn) {
    let _this = this;
    _this.currentState = PENDING;
    _this.value = undefined;
    _this.resolvedCallbacks = []
    _this.rejectedCallbacks = []

    _this.resolve = function (value) {
        if (value instanceof Mypromie) {
            return value.then(_this.resolve, _this.reject)
        }
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.currentState = RESOLVED;
                _this.value = value;
                _this.resolvedCallbacks.forEach(cb => cb())
            }
        }, 0);
    }

    _this.reject = function (msg) {
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.currentState = REJECTED;
                _this.value = msg;
                _this.rejectedCallbacks.forEach(cb => cb())
            }
        }, 0);
    }
    // 用于解决以下问题
    // new Promise(() => throw Error('error))
    try {
        fn(_this.resolve, _this.reject);
    } catch (e) {
        _this.reject(e);
    }
}

Mypromie.prototype.then = function (onResolved, onRejected) {
    let self = this
    let promise2
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : j => j

    if (self.currentState === RESOLVED) {
        return (promise2 = new Mypromie(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onResolved(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        }))
    }

    if (self.currentState === REJECTED) {
        return (promise2 = new Mypromie(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        }))
    }

    if (self.currentState === PENDING) {
        return (promise2 = new Mypromie(function (resolve, reject) {
            self.resolvedCallbacks.push(function () {
                try {
                    let x = onResolved(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)

                } catch (error) {
                    reject(error)
                }
            })

            self.rejectedCallbacks.push(function () {
                try {
                    let x = onRejected(selve.value)
                    resolutionProcedure(promise2, x, resolve, reject)

                } catch (error) {
                    reject(error)

                }
            })
        }))
    }
}

function resolutionProcedure(promise2, x, resolve, reject) {
    // 不能和 promise2 相同，避免循环引用
    if (promise2 === x) {
        return reject(new TypeError('error'))
    }
    // 状态为 pending 需要继续等待否则执行
    if (x instanceof Mypromie) {
        if (x.currentState === PENDING) {
            x.then(function (value) {
                // 再次调用该函数是为了确认 x resolve 的
                // 参数是什么类型，如果是基本类型就再次 resolve
                // 把值传给下个 then
                resolutionProcedure(promise2, value, resolve, reject)

            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }

    let called = false;
    if (x !== null && (typeof x === 'object' || typeof x === 'fucntion')) {
        try {
            let then = x.then
            // 如果 then 是函数，调用 x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true;
                    resolutionProcedure(promise2, y, resolve, reject);

                }, e => {
                    if (called) return
                    called = true;
                    reject(e)
                })
            } else {
                resolve(x)
            }

        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        //x 为基本类型
        resolve(x)
    }
}

function curry(fn,...args){
    // 如果传递的参数还没有达到要执行的函数fn的个数
    // 就继续返回新的函数(高阶函数)
    // 并且返回curry函数传递剩下的参数
  if(args.length<fn.length){
    return (...newArgs)=>curry(fn,...args,...newArgs)
  }else{
    return fn(...args)
  }
}

// 我们以ES6类的形式写出来
class EventEmitter {
  constructor() {
      // 事件对象，存储订阅的type类型
      this.events = Object.create(null);
  }
  on(type, cb) {
      let events = this.events;
      // 如果该type类型存在，就继续向数组中添加回调cb
      if (events[type]) {
          events[type].push(cb);
      } else {
          // type类型第一次存入的话，就创建一个数组空间并存入回调cb
          event[type] = [cb];
      }
  }
  emit(type, ...args) {
      // 遍历对应type订阅的数组，全部执行
      if (this.events[type]) {
          this.events[type].forEach(listener => {
              listener.call(this, ...args);
          });   
      }
  }
  off(type, cb) {
      let events = this.events;
      if (events[type]) {
          events[type] = events[type].filter(listener => {
              // 过滤用不到的回调cb
              return listener !== cb && listener.listen !== cb;
          });
      }
  }
  once(type, cb) {
      function wrap() {
          cb(...arguments);
          this.off(type, wrap);
      }
      // 先绑定，调用后删除
      wrap.listen = cb;
      // 直接调用on方法
      this.on(type, wrap);
  }
}


const jsonp = (opts = {}) => {
  // 通过一个callback参数所对应的函数名来把数据进行写入
  opts.url = `${opts.url}?callback=${opts.callback}`;
  // 在你需要传递其他参数时，需要遍历后拼接到url上
  for (let key in opts.data) {
      if (opts.data.hasOwnProperty(key)) {
          opts.url += `&${key}=${opts.data[key]}`;
      }
  }
  // 主要是依靠script的src属性加载内容没有跨域情况
  const script = document.createElement('script');
  script.src = opts.url;
  // 在script脚本执行完毕后，再删除此脚本
  script.onload = () => {
      document.body.removeChild(script);
  }
  // 把创建好的script脚本添加到body中
  document.body.appendChild(script);
};
//缓存函数抽象为高阶函数
function memoize(fn) {
  let isCalculated = false;
  let lastResult;
  return function memoizedFn() {
    // Return the generated function!
    if (isCalculated) {
      return lastResult;
    }
    let result = fn();
    lastResult = result;
    isCalculated = true;
    return result;
  };
}
//lodash 缓存
function memoize(func, resolver) {
  if (
    typeof func != "function" ||
    (resolver != null && typeof resolver != "function")
  ) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function () {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
// 给定10进制数，转换成[2~16]进制区间数
function Conver(number, base = 2) {
  let rem, res = '', digits = '0123456789ABCDEF', stack = [];

  while (number) {
    rem = number % base;
    stack.push(rem);

    number = Math.floor(number / base);
  }

  while (stack.length) {
    res += digits[stack.pop()].toString();
  }
  
  return res;
}
