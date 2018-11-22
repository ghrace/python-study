function computeMaxCallStackSize() {
    try {
        return 1 + computeMaxCallStackSize();
    } catch (e) {
        // Call stack overflow
        return 1;
    }
}
let result = computeMaxCallStackSize()
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
/**
 * 从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，
 * 重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。
 * 下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置
 * @param {Array} soucre 
 * @return {Array}
 */
const bubbleSort = function (soucre) {
    let len = soucre.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            count++
            if (soucre[j] > soucre[j + 1]) {
                change(soucre, j, j + 1)
            }
        }
    }
    return soucre
}
//选择排序
/**
 * 遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，
 * 将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作。
 * @param {*} soucre 
 */
const selectSort = function (soucre) {
    let len = soucre.length
    let minidx;
    for (let i = 0; i < len; i++) {
        minidx = i
        for (let j = i + 1; j < len; j++) {
            count++
            if (soucre[minidx] > soucre[j]) {
                minidx = j
            }
        }
        if (minidx !== i) {
            change(soucre, i, minidx)
        }
    }
    return soucre
}
//插入排序
/**
 * 第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。
 * 那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作
 * @param {*} source 
 */
const insertSort = function (source) {
    let len = source.length
    let value
    let j
    let i
    for (i = 0; i < len; i++) {
        value = source[i]
        // 已排序部分进行元素的右移一位，并把目标值value插入到对应的位置
        for (j = i - 1; j > -1 && source[j] > value; j--) {
            source[j + 1] = source[j]
        }
        source[j + 1] = value
    }
    return source
}
//归并排序
/**
 * 递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组。
 * 假设我有一组数组 [3, 1, 2, 8, 9, 7, 6]，中间数索引是 3，先排序数组 [3, 1, 2, 8] 。
 * 在这个左边数组上，继续拆分直到变成数组包含两个元素（如果数组长度是奇数的话，会有一个拆分数组只包含一个元素）。
 * 然后排序数组 [3, 1] 和 [2, 8] ，然后再排序数组 [1, 3, 2, 8] ，这样左边数组就排序完成，然后按照以上思路排序右边数组，
 * 最后将数组 [1, 2, 3, 8] 和 [6, 7, 9] 排序
 * @param {*} source 
 */
const mergeSort = function mergeSort(source) {
    let len = source.length
    if (len < 2) {
        return source
    }
    let mid = Math.floor(len / 2)
    let left = source.slice(0, mid)
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
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result
}
//快速排序
/**
 * 随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。比基准值小的放数组左边，大的放右边，
 * 对比完成后将基准值和第一个比基准值大的值交换位置。然后将数组以基准值的位置分为两部分，继续递归以上操作
 */
// 位置交换
const change = function (arr, n1, n2) {
    //        let temp = arr[n1]
    //        arr[n1] = arr[n2]
    //        arr[n2] = temp
    // 用es6的实现交换
    [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
}
const quiregai = function quiregai(source, start, end) {
    let pivot = source[Math.floor((start + end) / 2)]
    let i = start // 左边指针初始位置
    let j = end // 右边指针初始位置
    while (i <= j) {
        while (source[i] < pivot) {
            i++ // 左指针右移
        }
        while (source[j] > pivot) {
            j-- // 右指针左移
        }
        if (i <= j) {
            change(source, i, j) // 交换两个位置的值
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
    if (start < nextStart - 1) {
        quiregaiSort(source, start, nextStart - 1) // 上个循环结束的左指针作为左边区块循环的右指针
    }
    if (nextStart < end) {
        quiregaiSort(source, nextStart, end) // 上个循环结束的左指针作为右边区块循环的左指针
    }
    return source
}
//JS 数组长度大于 10 采用快排，否则插入排序