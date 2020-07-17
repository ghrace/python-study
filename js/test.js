
function swap (arr, n1, n2) {
  [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
}
// 洗牌
function shuffle (cards) {
  for (let i = cards.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * i)
    swap(cards, randomIndex, i)
  }
  return cards
}
function pigIt (str) {
  //Code here
  let list = str.split(' ')
  const final = list.map(item => {
    let str = item.split('')
    let str0 = str[0]
    str.shift()
    str.push(str0)
    if (/\w/.test(str)) {
      str = str.join('') + 'ay'
    }
    return str
  })
  return final.join(' ')
}

function pigIt1 (str) {
  // return str.replace(/\w+/g, (w) => {
  //     return w.slice(1) + w[0] + 'ay';
  //   });
  return str.replace(/(\w)(\w*)(\s|$)/g, '$2$1ay$3')
}
pigIt2 = s =>
  s
    .split(' ')
    .map(e => e.substr(1) + e[0] + 'ay')
    .join(' ')


function letter (dig) {
  const map = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }
  const letters = []
  const list = dig.split('')
  for (let item of list) {
    letters.push(map[item])
  }
  console.log(letters)
}
letter('79')

const isvalid = s => {
  const map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < 0) {
      stack.push(s[i])
    } else {
      let last = stack.pop()
      if (map[last] + map[s[i]] != 0) return false
    }
  }
  const len = stack.length
  if (len > 0) {
    return false
  }

  return true
}
const res = isvalid('[')
console.log(res)

function isObject (obj) {
  return typeof obj === 'object' && obj !== null;
}

function clone (obj) {
  if (!isObject(obj)) return obj
  let target = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (isObject(obj[key])) {
      target[key] = clone(obj[key])
    } else {
      target[key] = obj[key]
    }
  }
  return target
}
Array.prototype.select = function select() {
  for (let j = 0; j < this.length - 1; j++) {
      let min = j,
          temp = null;
      // 找到比当前项还小的这一项索引
      for (let i = min + 1; i < this.length; i++) {
          if (this[i] < this[min]) {
              min = i;
          }
      }
      // 让最小的项和当前首位交换位置
      swap(this,min,j);
  }
  return this;
};
Array.prototype.insert = function insert() {
  // 1.准备一个新数组，用来存储抓到手里的牌，开始先抓一张牌进来
  let handle = [];
  handle.push(this[0]);

  // 2.从第二项开始依次抓牌，一直到把台面上的牌抓光
  for (let i = 1; i < this.length; i++) {
      // A是新抓的牌
      let A = this[i];
      // 和HANDDLE手里的牌依次比较（从后向前比）
      for (let j = handle.length - 1; j >= 0; j--) {
          // 每一次要比较的手里的牌
          let B = handle[j];
          // 如果当前新牌A比要比较的牌B大了，把A放到B的后面
          if (A > B) {
              handle.splice(j + 1, 0, A);
              break;
          }
          // 已经比到第一项，我们把新牌放到手中最前面即可
          if (j === 0) {
              handle.unshift(A);
          }
      }
  }
  return handle;
}



Array.prototype.shell = function shell () {
  let gap = Math.floor(this.length / 2);
  while (gap >= 1) {
    for (let i = gap; i < this.length; i++) {
      while (i - gap >= 0 && this[i] < this[i - gap]) {
        swap(this, i, i - gap);
        i = i - gap;
      }
    }
    gap = Math.floor(gap / 2);
  }
};
let arr = [58, 23, 67, 36, 40, 46, 35, 28, 20, 10];
/**
 * 把arr分成count份，确保每一份和尽量相等
 * @param {Array} arr 数组
 * @param {number} count 几份
 */
function equal (arr,count){
  //数组从大到小排序
  arr.sort((a,b) => b - a);
  //计算平均值
  let avg = arr.reduce((a,b) => a + b) / count;
  //从大到小求和，取最接近平均值的一组，放入二维数组
  let resArr = [];
  let current = 0;
  for (let i = 0; i < count-1; i++) {
      if(current + arr[arr.length-1]/2 < avg && i){
          arr.pop();
          resArr[i-1].push(arr[arr.length-1]);
      }
      current = 0;
      resArr[i] = [];
      arr.forEach((item,index) => {
          current += item;
          arr.splice(index,1);
          resArr[i].push(item);
          if(current > avg){
              current -= item;
              arr.splice(index,0,item);
              resArr[i].pop();
          }
      })
  }
  resArr[count-1] = arr;
  return resArr
}