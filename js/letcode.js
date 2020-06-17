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

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
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