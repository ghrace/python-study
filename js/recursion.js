function sumRange(num) {
    if (num === 1) return 1;
    return num + sumRange(num - 1) //
}
console.log(sumRange(4)); //4+3+2+1
//接受一串字符串，返回一个字符串，这个字符串是将原来字符串倒过来
function reverse(str) {
    if (str.length <= 1) return str;
    return reverse(str.slice(1)) + str[0];
}
console.log(reverse('errtdfd'));
//接受一串字符串，同时从前后开始拿一位字符对比，如果两个相等，返回 true，如果不等，返回 false
function isPalindrome(str) {
    if (str.length === 1) return true;
    if (str.length === 2) return str[0] === str[1];
    if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1))
    return false
}
console.log(isPalindrome('abba'));
//接受一个数组，返回扁平化新数组
function flatten(oldArr) {
    let newArr = []
    for (let i = 0; i < oldArr.length; i++) {
        if (Array.isArray(oldArr[i])) {
            newArr = newArr.concat(flatten(oldArr[i]))
        } else {
            newArr.push(oldArr[i])
        }
    }
    return newArr;
}

flatten([1, [2, [3, 4]], 5])
//接受一个对象，这个对象值是偶数，则让它们相加，返回这个总值
function nestedEvenSum(obj, sum = 0) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            sum += nestedEvenSum(obj[key]);
        } else if (typeof obj[key] === 'number' && obj[key] % 2 === 0) {
            sum += obj[key];
        }
    }

    return sum;
}

nestedEvenSum({
    c: 4,
    d: {
        a: 2,
        b: 3
    }
})
//接受一个对象，返回一个数组，这个数组包括对象里所有的值是字符串
function collectStrings(obj) {
    let newArr = []
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            newArr.push(obj[key])
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            newArr = newArr.concat(collectStrings(obj[key]))
        }
    }
    return newArr
}

let obj = {
    a: '1',
    b: {
        c: 2,
        d: 'dd'
    }
}

collectStrings(obj)
//递归常用到的方法
/**
 * 数组：slice, concat
   字符串: slice, substr, substring
   对象：Object.assign
 */