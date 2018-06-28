function computeMaxCallStackSize() {
    try {
        return 1 + computeMaxCallStackSize();
    } catch (e) {
        // Call stack overflow
        return 1;
    }
}
let result=computeMaxCallStackSize()
console.log(result);

let count = 0 
// 位置交换函数
 const change = function (arr, n1, n2) {
      // 用es6的实现交换
      [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
     //let temp = arr[n1]
     //arr[n1] = arr[n2]
     //arr[n2] = temp
 }
 // 冒泡排序
 const bubbleSort = function (soucre) {
     let len = soucre.length
     for (let i = 0;i < len - 1; i++) {
         for (let j = 0; j < len - 1 - i;j++) {
             count ++
             if (soucre[j] > soucre[j+1]) {
                change(soucre, j, j+1)
             }
         }
     }
     return soucre
 }
 //选择排序
 const selectSort = function (soucre) {
    let len = soucre.length
    let minidx;
    for (let i = 0; i < len; i ++) {
        minidx = i
        for (let j = i + 1; j < len; j++) {
            count ++
            if (soucre[minidx] > soucre[j]) {
                minidx = j
            }
        }
        if (minidx !== i) {
            change(soucre,i,minidx)
        }
    }
    return soucre
}
//插入排序
const insertSort = function (source) {
    let len = source.length
    let value
    let j
    let i
    for (i = 0; i < len; i++) {
        value = source[i]
        // 已排序部分进行元素的右移一位，并把目标值value插入到对应的位置
        for (j = i -1 ;j > -1 && source[j] > value; j--) {
            source[j+1] = source[j]
        }
        source[j+1] = value
    }
    return source
}
//归并排序
const mergeSort = function mergeSort(source) {
    let len = source.length
    if (len < 2) {
        return source
    }
    let mid = Math.floor(len/2)
    let left = source.slice(0,mid)
    let right = source.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    let result = []
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length){
        result.push(left.shift())
    }
    while (right.length){
        result.push(right.shift())
    }
    return result
}
//快速排序
// 位置交换
const change = function (arr, n1, n2) {
    //        let temp = arr[n1]
    //        arr[n1] = arr[n2]
    //        arr[n2] = temp
      // 用es6的实现交换
      [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
  }
const quiregai = function quiregai(source, start, end) {
     let pivot = source[Math.floor((start + end)/2)]
     let i = start // 左边指针初始位置
     let j = end // 右边指针初始位置
     while(i<=j) {
         while (source[i] < pivot) {
             i ++ // 左指针右移
         }
         while (source[j] > pivot) {
             j -- // 右指针左移
         }
         if (i <= j){
             change(source,i,j) // 交换两个位置的值
             i++
             j--
         }
     }
     return i // 返回一轮循环后左指针的位置，为下一轮循环初始位置确定
  }
  const quiregaiSort = function quiregaiSort(source, start, end) {
      if (source.length < 2) return source
      var start = start || 0
      var end = end || source.length - 1
      var nextStart = quiregai(source, start, end)
//        debugger
      if (start < nextStart -1) {
          quiregaiSort(source, start, nextStart -1 ) // 上个循环结束的左指针作为左边区块循环的右指针
      }
      if (nextStart < end) {
          quiregaiSort(source, nextStart, end) // 上个循环结束的左指针作为右边区块循环的左指针
      }
      return source
  }