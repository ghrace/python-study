class Observer {
  constructor(value) {
    this.value = value;
    if (!value || typeof value !== 'object') {
      return
    } else {
      this.walk(value)
    }
  }

  walk (obj) {
    Object.keys(obj).forEach(key => {
      definReactive(obj, key, obj[key])
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  /*依赖收集，当存在Dep.target的时候添加观察者对象*/
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 通知所有watcher对象更新视图

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  constructor() {
    /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
    Dep.target = this;
  }

  update () {
    console.log('view update')
  }

  addDep (dep) {
    dep.addSub(this)
  }
}

class Vue {
  constructor(options) {
    this._data = options._data
    new Observer(this._data)
    new Watcher()

  }
}

function defineReactive (obj, key, val) {
  new Observer(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 依赖收集
      dep.depend()
      return val
    },
    set: function reacitveSetter (newval) {
      if (newval === val) return
      new Observer(val)//深度监听
      dep.notify()
    }
  })
}


const oldArrayProperty=Array.prototype;

const arrProto=Object.create(oldArrayProperty)

['push','pop','shift','unshift','splice'].forEach(name=>{
  arrProto[name]=function(){
    updateView();
    oldArrayProperty[name].call(this,...arguments)
  }
})



/**
 * Vue 的这个 DOM Diff 过程就是一个查找排序的过程，遍历 Virtual DOM 的节点，
 * 在 Real DOM 中找到对应的节点，并移动到新的位置上。不过这套算法使用了双向遍历的方式，加速了遍历的速度,
 * 同级比较，因为在 compile 阶段的optimize标记了static 点，可以减少 differ 次数
 */
// 相同点:
// 都是同层 differ,复杂度都为 O(n);
// 不同点:
// 1.React 首位是除删除外是固定不动的,然后依次遍历对比;
// 2.Vue 的compile 阶段的optimize标记了static 点,可以减少 differ 次数,而且是采用双向遍历方法;
