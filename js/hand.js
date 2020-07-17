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