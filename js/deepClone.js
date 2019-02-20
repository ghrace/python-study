function isObject(obj) {
  return typeof obj === 'object' && obj != null
}
let a = {
  name: 'jack',
  list: [1, 2],
  a1: {
    sex: 'male'
  },
  s: Symbol('ss'),
  n:null,
  u:undefined,
  func:function(){
    console.log(1);
  },
  reg:/123/g,
  data:new Date(),
  Nan:NaN,
  infinity:Infinity,
}
//循环引用
a.self = a

function clone1(obj) {
  let target = {}
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        target[key] = clone1(obj[key]) //递归
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}
//兼容数组
function clone2(obj) {
  if (!isObject(obj)) return obj
  let target = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key])) {
        target[key] = cloneDeep2(obj[key]) // 注意这里
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}

// 木易杨
function clone3(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj
  if (hash.has(obj)) return hash.get(obj) // 新增代码，查哈希表

  let target = Array.isArray(obj) ? [] : {}
  hash.set(obj, target) // 新增代码，哈希表设值

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key])) {
        target[key] = clone3(obj[key], hash) // 新增代码，传入哈希表
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}

function clone4(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj
  if (hash.has(obj)) return hash.get(obj)

  let target = Array.isArray(obj) ? [] : {}
  hash.set(obj, target)

  let symKeys = Object.getOwnPropertySymbols(obj) // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach(symKey => {
      if (isObject(obj[symKey])) {
        target[symKey] = clone4(obj[symKey], hash)
      } else {
        target[symKey] = obj[symKey]
      }
    })
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key])) {
        target[key] = clone4(obj[key], hash)
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}

function clone5(x) {
  const root = {}

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]
  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }

  return root
}

console.log(clone4(a));