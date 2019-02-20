// var arr1 = [1, 2, [3, 4]];
// arr1.flat(); 

// export function flatten (arr: Array<any>): Array<any> {
//     return Array.prototype.concat.apply([], arr)
//   }
// /**
//  * 空函数，什么都不做，用于初始化一些值为函数的变量。
//  */
// export function noop (a?: any, b?: any, c?: any) {}

// /**
//  * Always return false.
//  */
// export const no = (a?: any, b?: any, c?: any) => false

// /**
//  * Return same value
//  */
// export const identity = (_: any) => _
/**
 * @param {string} s
 * @return {boolean}
 */

function isValid(s) {
  const stack = [];
  const helpMap = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  for (let i = 0, l = s.length; i < l; i++) {
    const char = s[i];
    if (char in helpMap) {
      stack.push(helpMap[char]);
    } else if (char !== stack.pop()) {
      return false;
    }
  }
  return stack.length === 0
}

console.log(isValid('sed(4)'));

function getUrlData() {
  let url = location.search; //获取url中"?"符后的字串   
  url = decodeURI(url);
  let result = {};
  const reg = new RegExp('([\?|&])(.+?)=([^&?]*)', 'ig');
  let arr = reg.exec(url);
  while (arr) {
    result[arr[2]] = arr[3];
    arr = reg.exec(url);
  }
  return result;
}

let url = 'http://www.sodacar.com/vehicles?car=13242&station=83212jde&lat=102.21301&lng=31.22345'


// function sum() {
//   let args = [].slice.call(arguments)
//   return function () {
//     if (arguments.length === 0) {
//       return args.reduce(function (a, b) { return a + b })
//     }
//     Array.prototype.push.apply(args, arguments)
//     return arguments.callee
//   }
// }

function currying(fn) {
  let allArgs = [];

  return function next() {
    let args = [].slice.call(arguments);

    if (args.length > 0) {
      allArgs = allArgs.concat(args);
      return next;
    }
  }
}
function sum() {
  console.log('arguments', arguments);
  let args = Array.prototype.slice.call(arguments);
  console.log('args',args);
  function adder() {
    let newArgs = Array.prototype.slice.call(arguments);
    console.log('newargs',newArgs)
    args = args.concat(newArgs);
    return adder;   //每次调用后返回自身函数对象，连续调用
  }
  adder.valueOf = function () {
    return args.reduce((pre, current) => {
      return pre + current;
    });
  }
  return adder;
}
let res = sum(1)(2, 3)(4, 5).valueOf() 
console.log(res)