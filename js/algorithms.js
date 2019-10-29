/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}两个数相加等于target的index
 */
const twoSum = function(nums, target) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    const val = target - nums[i]
    if (map[val] !== undefined) {
      return [map[val], i]
    }
    map[nums[i]] = i
  }
  return 'no match'
}

// setTimeout(() => {
//   console.log('a')
//   new Promise(res => {
//     res()
//   }).then(() => {
//     console.log('c')
//   })
//   process.nextTick(() => {
//     console.log('h')
//   })
// }, 0)
// console.log('b')

// process.nextTick(() => {
//   console.log('d')
//   process.nextTick(() => {
//     console.log('e')
//     process.nextTick(() => {
//       console.log('f')
//     })
//   })
// })

// setImmediate(() => {
//   console.log('g')
// })

//
console.log('start')
process.nextTick(() => {
  console.log('a')
  setImmediate(() => {
    console.log('d')
  })
  new Promise(res => res()).then(() => {
    console.log('e')
    process.nextTick(() => {
      console.log('f')
    })
    new Promise(r => {
      r()
    }).then(() => {
      console.log('g')
    })
    setTimeout(() => {
      console.log('h')
    })
  })
})

setImmediate(() => {
  console.log('b')
  process.nextTick(() => {
    console.log('c')
  })
  new Promise(res => res()).then(() => {
    console.log('i')
  })
})
console.log('end')

function sortArray(arr) {
  // Return a sorted array
  let arrIndex = []
  if (arr.length == 0) {
    return arr
  }
  arr
    .filter((item, index) => {
      if (item % 2 != 0) {
        arrIndex.push(index)
        return item
      }
    })
    .sort((a, b) => a - b)
    .forEach((item, index) => (arr[arrIndex[index]] = item))
  return arr
}
const list = [1, 34, 6, 3, 55, 6, 7, 5]
function sortArray1(array) {
  const odd = array.filter(x => x % 2).sort((a, b) => a - b)
  return array.map(x => (x % 2 ? odd.shift() : x))
}
console.log(sortArray1(list))
/**
 * 有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；

最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；

问：原来那堆牌的顺序，用函数实现。
 */
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
function sort(arr) {
  let pre = []
  while (arr.length > 1) {
    pre.push(arr.pop())
    pre.push(pre.shift())
  }
  pre.push(arr.pop())
  console.log(pre)
}
sort(arr)
// [ 7, 10, 6, 13, 5, 9, 4, 11, 3, 8, 2, 12, 1 ]
//2
/**
 * 逆向：即从桌牌到手牌
 * @param {*} 桌牌序列 arr
 */
function recover(arr) {
  const res = []
  while (arr.length > 0) {
    if (res.length) {
      res.push(res.shift())
    }
    const item = arr.pop()
    res.push(item)
  }
  return res
}

/**
 * 正向：即从手牌到桌牌（用于检验结果）
 * @param {*} 手牌序列arr
 */
function generate(arr) {
  const res = []
  while (arr.length > 0) {
    const item = arr.pop()
    res.push(item)
    if (arr.length) {
      arr.unshift(arr.pop())
    }
  }
  return res
}
//answer
// 一堆牌，[1,2,3,4,5,6,7,8,9,10,11,12,13]，将牌堆第一张放到桌子上，
// 再将接下来的牌堆的第一张放到牌底，如此往复，牌底到牌顶顺序
const poker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const makePoker = _list => {
  const rst = []
  const list = _list.slice()
  while (list.length) {
    rst.push(list.pop())
    list.length && list.unshift(list.pop()) // 还有牌才会执行这一步
  }
  return rst
}
console.log(makePoker(poker)) // [ 13, 11, 9, 7, 5, 3, 1, 10, 6, 2, 8, 12, 4 ]

// 如果已知排好序后的牌是[1,2,3,4,5,6,7,8,9,10,11,12,13]，求初始牌？
const reversePoker = _list => {
  const rst = []
  const list = _list.slice()
  while (list.length) {
    rst.push(list.pop())
    list.length && rst.push(rst.shift()) // 桌面的牌拿完了就不能再执行了，也就是桌面还有牌才执行
  }
  return rst
}
console.log(reversePoker(poker)) // [ 7, 10, 6, 13, 5, 9, 4, 11, 3, 8, 2, 12, 1 ]
