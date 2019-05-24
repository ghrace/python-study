/**
 * 先定义一个Object类型的数据结构obj，它的key为target - numbers[i]（比如数组第一项为2），value为索引。
 * 然后每次都看看obj[numbers[i]] 是否存在，如果存在，那我们就找到了这样的一组数据，返回当前索引以及obj[numbers[i]]
 * @param {array} nums
 * @param {number} target
 */
function twoSum(nums, target) {
  let obj = {}
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    if (obj[item] >= 0) {
      return [obj[item], i]
    } else {
      obj[target - item] = i
    }
  }
}
let nums = [2, 3, 7, 11, 15, 6]
let res = twoSum(nums, 13)
console.log(res)
/**
 * 
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit.
 *  Add the two numbers and return it as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
Example:
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let addTwoNumbers = function (l1,l2) {
    let result = new ListNode(0),
        node = result;
    while(l1 || l2){
        let r = node.val,
            i = (l1 && l1.val) || 0,
            j = (l2 && l2.val) || 0,
            sum = r + i + j,
            m,n;
        if(sum >= 10){
            m = 1;
            n = sum - 10;
        }else{
            m = 0;
            n = sum;
        }
        l1 = l1 && l1.next;
        l2 = l2 && l2.next;
        node.val = n;
        if(m || l1 || l2){
            node.next = new ListNode(m);
            node = node.next
        }
    }
    return result;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
    let result = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        let set = new Set();
        set.add(s.charAt(i));
        for (let j = i + 1; j < len; j++) {
            if (set.has(s.charAt(j))) {
                break;
            }
            set.add(s.charAt(j));
        }
        result = Math.max(result,set.size);
    }
    return result;
};

/**
 * @param {number} x 321
 * @return {number} 123
 */
const reverse = function(x) {
    const num = parseInt(x.toString().split('').reverse().join(''))
    if(num > Math.pow(2, 31)) {
        return 0
    }
    if(x < 0){
        return num*(-1)
    } else {
        return num
    }
};

/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    const INT_MAX = 2 ** 31 - 1;
    const INT_MIN = -(2 ** 31);
    str = str.match(/^\s*([-+]?\d+)/);
    let strNum = str ? Number(str[0]) : 0;
    if(strNum < INT_MIN ){
        return INT_MIN
    }else if(strNum > INT_MAX){
        return INT_MAX
    }else{
        return strNum
    }
};
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0||x!==0&&x%10===0)
        return false;
    var reverse = 0;
    while (x>reverse){
        reverse = reverse*10 +x%10;
        x = Math.floor(x/10);
    }
    return reverse === x||Math.floor(reverse/10) === x;
};
var isPalindrome = function(x) {
    return x.toString().split('').reverse().join('')==x.toString()?true:false;
};
//对向查找，直到找到最大乘积 o(n)
var maxArea = function (list) {
    let i = 0,j = list.length -1,result = 0;
    while(i < j){
        result = Math.max(result ,(j - i ) * Math.min(list[i],list[j]))
        if(list[i] < list[j]){
            i++;
        }else{
            j--;
        }
    }
    return result;
};
//o(n2)
var maxArea = function (list) {
    let result = 0;
    for(let i = 0,len = list.length; i<len; i++){
        for(let j = i+1; j<len; j++){
            let x = (j - i);
            let y = Math.min(list[i],list[j]);
            result = Math.max(result,x*y)
        }
    }
    return result;
};
/**
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
 */
let getMap = function () {
    return {
        1:'I',
        4:'IV',
        5:'V',
        9:'IX',
        10:'X',
        40:'XL',
        50:'L',
        90:'XC',
        100:'C',
        400:'CD',
        500:'D',
        900:'CM',
        1000:'M'
    };
};

let match = function (result,num) {
    let obj = getMap();
    while (result.num >= num){
        let n = parseInt(result.num /num);
        result.num = result.num % num;
        result.str = result.str + obj[num].repeat(n);
    }
};

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    if(num < 1 || num > 3999) throw Error('error');
    let obj = getMap();
    if(num in obj) return obj[num];
    let result = {
        str:'',
        num
    };
    match(result,1000);
    match(result,900);
    match(result,500);
    match(result,400);
    match(result,100);
    match(result,90);
    match(result,50);
    match(result,40);
    match(result,10);
    match(result,9);
    match(result,5);
    match(result,4);
    match(result,1);

    return result.str;
};

/**
 * Input: ["flower","flow","flight"]
    Output: "fl"
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix = function(strs) {
    let firstStr = strs[0];
    let result ='';
    if(!strs.length){
        return result;
    }
    for (let i = 0; i < firstStr.length; i++) {
        for (let j =  1; j < strs.length; j++) {
            if(firstStr.charAt(i) !== strs[j].charAt(i)){
                return result;
            }
        }
        result = result + firstStr.charAt(i);
    }
    return result;

};
//Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSum = function(nums, n = 0) {
    let result = [];
    let len = nums.length;
    if(!len) return result;
    // 对数组进行排序
    nums.sort((a,b)=>a-b);
    for(let k = 0; k<len; k++){
        //重复的元素则结果也一样，所以跳过该循环
        if(k>0 && nums[k-1] === nums[k]){
            continue;
        }
        let target = n - nums[k];
        let i = k + 1;
        let j = len -1;
        while(i<j){
            if(nums[i] + nums[j] === target){
                result.push([nums[k],nums[i],nums[j]]);
                while (i<j && nums[i] === nums[i+1]) i++;
                while (i<j && nums[j] === nums[j-1]) j--;
                i++;
                j--;
            }else if(nums[i] + nums[j] > target){
                j--;
            }else{
                i++
            }
        }
    }
    return result;
};

/**
 Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. 
 You may assume that each input would have exactly one solution.
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    let result = Infinity;
    let len = nums.length;
    if(len <= 3){
        return nums.reduce((a,b)=>a+b,0);
    }
    nums.sort((a,b)=>a-b);
    for(let k = 0; k<len-2; k++){
        if(k>0 && nums[k-1] === nums[k]){
            continue;
        }
        let i = k + 1;
        let j = len -1;
        while(i<j){
            let count = nums[k] + nums[i] + nums[j];
            if(count === target){
                return target;
            }
            if(Math.abs(result - target) > Math.abs(count - target)){
                result = count;
            }
            if(count > target){
                j--
            }else{
                i ++
            }
        }
    }
    return result;
};

/**
 * 递归函数
 * @param digits 传入的数字
 * @param index 当前是第几个数字
 * @param str 当前已拼装的字符串
 * @param list 结果集
 */
let helper = function (digits, index, str, list) {
    let map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    };
    if (str.length === digits.length) {
        list.push(str);
        return false;
    }
    let strs = map[digits[index]];
    for (let i = 0; i < strs.length; i++) {
        helper(digits, index + 1, str + strs.charAt(i), list)
    }
};
let letterCombinations = function (digits) {
    let list = [];
    if (digits) {
        helper(digits, 0, '', list);
    }
    return list;
};
/**
 * @param {string} digits
 * @return {string[]}
 */
let letterCombinations = function (digits) {
    let map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    };
    let res = [];
    for(let i = 0,len = digits.length; i<len; i++){
        let str = map[digits.charAt(i)];
        if(!res.length){
            for(let i = 0,len = str.length; i<len; i++){
                res.push(str.charAt(i));
            }
        }else{
            let r = [];
            for(let j = 0,length = res.length; j<length; j++){
                for(let i = 0,len = str.length; i<len; i++){
                    r.push(res[j] + str.charAt(i));
                }
            }
            res = r;
        }
    }
    return res;
 };

 /**
  *  characters '(', ')', '{', '}', '[' and ']'
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(!s){
        return true;
    }
    let array = [];
    for(let i = 0,len = s.length; i<len; i++){
        let cur = s.charAt(i);
        if(cur === '(' || cur === '{' || cur === '['){
            array.push(cur);
        }else if(!array.length){
            return false;
        }else{
            let pre = array.pop();
            if(pre === '(' && cur !== ')'){
                return false;
            }
            if(pre === '{' && cur !== '}'){
                return false;
            }
            if(pre === '[' && cur !== ']'){
                return false;
            }
        }
    }
    return !array.length
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l2 == null) return l1;
    if(l1 == null) return l2;
    if(l1.val<l2.val){
        l1.next = mergeTwoLists(l1.next,l2);
        return l1;
    }else{
        l2.next = mergeTwoLists(l2.next,l1);
        return l2;
    }
};

/**
 * N=3
 * [
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]

 * 递归函数
 * @param left  剩余的左括号
 * @param right 剩余的又括号
 * @param str  当前已拼装括号的字符串
 * @param list  最终结果集
 */
let helper = function (left,right,str,list) {
    //当前右括号大于左括号
    if (left > right){
        return ;
    }
    //左括号，右括号均无剩余，作为终值填充
    if(left === 0 && right === 0){
        list.push(str);
        return ;
    }
    //左括号有剩余
    if(left > 0){
        helper(left - 1,right,str + '(',list);
    }
    //右括号有剩余
    if(right > 0){
        helper(left,right - 1,str + ')',list);
    }
};
/**
 * @param {number} n
 * @return {string[]}
 */
let generateParenthesis = function(n) {
    let list = [];
    helper(n,n,'',list);
    return list;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let searchInsert = function(nums, target) {
    let lo = 0,high = nums.length-1;
    while(lo<=high){
         let mid = Math.floor((high-lo)/2)+lo;
         if(nums[mid]===target)
             return mid;
         if(nums[mid]>target)
             high = mid-1;
         else lo = mid+1;
    }
    return lo;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    var temp = s.split(' ').filter( value=>value!='');
    return temp.length>0?temp.pop().length:0;
};
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for(var i=digits.length-1;i>=0;i--){
        if(digits[i]<9){
            digits[i]++;
            return digits;
        }
        digits[i]=0;
    }
    digits.unshift(1);
    return digits;
};
/**
 * Given two binary strings, return their sum (also a binary string).
 * 对于每一位数进行加法，如有进位单独计算
注意需使用字符串进行存储，整型无法计算大型数据
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    var tempA = a.split('');
    var tempB = b.split('');
    var result =[];
    var aLen=tempA.length,bLen=tempB.length;
    var carry = 0;
    while(aLen>0||bLen>0){
        var charA=0,charB=0;
        if(aLen>0)
            charA = tempA[--aLen]-0;
        if(bLen>0)
            charB = tempB[--bLen]-0;
        var temp = charA + charB + carry;
        carry = temp>1?1:0;
        result.unshift(temp%2);
    }
    if(carry===1)
        result.unshift(1);
    return result.toString().replace(/,/g,'');
};