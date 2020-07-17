//easy
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
}
console.log(twoSum([2,7,11,15],9))
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  let valid = true;
  const stack = [];
  const mapper = {
    '{': "}",
    "[": "]",
    "(": ")"
  }

  for (let i in s) {
    const v = s[i];
    if (['(', '[', '{'].indexOf(v) > -1) {
      stack.push(v);
    } else {
      const peak = stack.pop();
      if (v !== mapper[peak]) {
        return false;
      }
    }
  }

  if (stack.length > 0) return false;

  return valid;
};

function countMap (arr) {
  let map = new Map()
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let count = map.get(item)
    if (count) {
      map.set(item, count + 1)
    } else {
      map.set(item, 1)
    }
  }
  console.log(map)
  return map
}

function intersect (arr1, arr2) {
  let map1 = countMap(arr1)
  let map2 = countMap(arr2)
  let res = []
  for (let item of map1.keys()) {
    const count1 = map1.get(item)
    const count2 = map2.get(item)
    if (count2) {
      const pushCount = Math.min(count1, count2)
      for (let i = 0; i < pushCount; i++) {
        res.push(item)
      }
    }
  }
  return res
}

const intersect2 = function (nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  let map = {};
  let ret = [];
  for (let val of nums1) {
    if (map[val]) map[val]++;
    else map[val] = 1;
  }
  console.log(map)
  for (let val of nums2) {
    if (map[val]) {
      ret.push(val);
      map[val]--;
    }
  }
  return ret;
};

console.log(intersect2([1, 2, 2, 5], [2, 2, 3, 5, 4]))

const intersect3 = function (nums1, nums2) {
  let result = [];
  for (let i = 0; i < nums1.length; i++) {
    nums2.includes(nums1[i]) && result.push(...nums2.splice(nums2.indexOf(nums1[i]), 1));
  }
  return result
};

console.log(intersect3([1, 2, 2, 5], [2, 2, 3, 5, 4]))

const intersect4 = function (nums1, nums2) {
  return nums1.filter(v => nums2.indexOf(v) > -1)
  // let s=new Set(b)
  // retun nums1.filter(x=>s.has(x))
}
console.log(intersect4([1, 2, 2, 5], [2, 2, 3, 5, 4]))