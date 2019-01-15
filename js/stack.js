//栈按照顺序存储数据，并删除最后添加的数据 先进后出
class Stack {
  constructor() {
    this._size = 0
    this._storage = {}
  }

  push(data) {
    let size = this._size++
    this._storage[size] = data
  }

  pop() {
    let size = this._size
    let deleteData
    if (size) {
      deleteData = this._storage[size]
      delete this._storage[size]
      this._size--
      return deleteData
    }
  }
}
//队列按顺序存储数据，但删除最先的添加数据 先进先出
class Queue {
  constructor() {
    this._oldstIndex = 1
    this._newestIndex = 1
    this._storage = {}
  }

  size() {
    return this._newestIndex - this._oldstIndex
  }

  enqueue(data) {
    this._storage[this._newestIndex] = data
    this._newestIndex++
  }

  dequeue() {
    let oldstIndex = this._oldstIndex
    let deleteData = this._storage[oldstIndex]
    delete this._storage[oldstIndex]
    this._oldstIndex++
    return deleteData
  }
}
