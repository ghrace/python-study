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
const list=[1,34,6,3,55,6,7,5]
function sortArray1(array) {
  const odd = array.filter(x => x % 2).sort((a, b) => a - b)
  return array.map(x => (x % 2 ? odd.shift() : x))
}
console.log(sortArray1(list));