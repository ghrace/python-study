function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}


// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
    constructor() {
      this.subs = []
    }
    // 添加依赖
    addSub(sub) {
      this.subs.push(sub)
    }
    // 更新
    notify() {
      this.subs.forEach(sub => {
        sub.update()
      })
    }
  }
  // 全局属性，通过该属性配置 Watcher
  Dep.target = null

  class Watcher {
    constructor(obj, key, cb) {
      // 将 Dep.target 指向自己
      // 然后触发属性的 getter 添加监听
      // 最后将 Dep.target 置空
      Dep.target = this
      this.cb = cb
      this.obj = obj
      this.key = key
      this.value = obj[key]
      Dep.target = null
    }
    update() {
      // 获得新值
      this.value = this.obj[this.key]
      // 调用 update 方法更新 Dom
      this.cb(this.value)
    }
  }

  function defineReactive(obj, key, val) {
    // 递归子属性
    observe(val)
    let dp=new Dep()
    Object.defineProperty(obj, key, {
      // 可枚举
      enumerable: true,
      // 可配置
      configurable: true,
      // 自定义函数
      get: function reactiveGetter() {
        console.log('get value')
        if(Dep.target){
            dp.addSub(Dep.target)
        }
        return val
      },
      set: function reactiveSetter(newVal) {
        console.log('change value')
        val = newVal
        dp.notify()
      }
    })
  }

var data = { name: 'abc' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value
function update(value) {
    document.querySelector('.time').innerText = value
  }
  // 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)