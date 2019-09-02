//可继续遍历数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

function forEach(arr, fn) {
  let index = -1
  const length = arr.length
  while (++index < length) {
    fn(arr[index], index)
  }
  return arr
}
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}
function cloneReg(target) {
  const reFlags = /\w*$/
  const res = new target.constructor(target.source, reFlags.exec(target))
  res.lastIndex = target.lastIndex
  return res
}
function cloneFunc(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    console.log('普通函数')
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      console.log('匹配到函数体：', body[0])
      if (param) {
        const paramArr = param[0].split(',')
        console.log('匹配到参数：', paramArr)
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}
function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)
    case funcTag:
      return cloneFunc(target)
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  //原始类型
  if (!isObject(target)) {
    return target
  }
  //初始化
  const type = getType(target)
  let result
  if (deepTag.includes(type)) {
    result = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }
  //处理循环引用
  if ((map, get(target))) {
    return target
  }
  map.set(target, result)
  //set,map
  if (type === setTag) {
    target.forEach(val => {
      result.add(clone(val))
    })
    return result
  }
  if (type === mapTag) {
    target.forEach((val, k) => {
      result.set(k, clone(val))
    })
    return result
  }
  //obj,arr
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (val, key) => {
    if (keys) {
      key = val
    }
    result[key] = clone(target[key], map)
  })
  return result
}
module.exports = { clone }
