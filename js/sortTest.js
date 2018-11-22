/*
时间复杂度指的是一个算法执行所耗费的时间
空间复杂度指运行完一个程序所需内存的大小
稳定指，如果a=b,a在b的前面，排序后a仍然在b的前面
不稳定指，如果a=b，a在b的前面，排序后可能会交换位置
*/
function createRandom(num, from, to) {
    let arr = [];
    for (let i = from; i <= to; i++)
        arr.push(i);
    arr.sort(function () {
        return 0.5 - Math.random();
    });
    arr.length = num;
    return arr;
}
const arr = createRandom(100000, 0, 10000)

function checkArray(arr) {
    if (!arr || arr.length <= 2) return
}

function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}
//es6
// function swap(arr, n1, n2) {
//   [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
// }
//冒泡
function bubble(array) {
    checkArray(array);
    for (let i = array.length - 1; i > 0; i--) {
        // 从 0 到 `length - 1` 遍历
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) swap(array, j, j + 1)
        }
    }
    return array;
}
console.time('bubble')
const bub = bubble(arr)
//console.log(bub);
console.timeEnd('bubble')
//插入
function insertion(array) {
    checkArray(array);
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--)
            swap(array, j, j + 1);
    }
    return array;
}
console.time('insert')
const ins = insertion(arr)
//console.log(ins);
console.timeEnd('insert')
//选择
function selection(array) {
    checkArray(array);
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            minIndex = array[j] < array[minIndex] ? j : minIndex;
        }
        swap(array, i, minIndex);
    }
    return array;
}
console.time('select')
const sel = selection(arr)
//console.log(sel);
console.timeEnd('select')
//归并
function guisort(array) {
    checkArray(array);
    mergeSort(array, 0, array.length - 1);
    return array;
}

function mergeSort(array, left, right) {
    // 左右索引相同说明已经只有一个数
    if (left === right) return;
    // 等同于 `left + (right - left) / 2`
    // 相比 `(left + right) / 2` 来说更加安全，不会溢出
    // 使用位运算是因为位运算比四则运算快
    let mid = parseInt(left + ((right - left) >> 1));
    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);

    let help = [];
    let i = 0;
    let p1 = left;
    let p2 = mid + 1;
    while (p1 <= mid && p2 <= right) {
        help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
    }
    while (p1 <= mid) {
        help[i++] = array[p1++];
    }
    while (p2 <= right) {
        help[i++] = array[p2++];
    }
    for (let i = 0; i < help.length; i++) {
        array[left + i] = help[i];
    }
    return array;
}

console.time('guibing')
const gui = guisort(arr)
//console.log(gui);
console.timeEnd('guibing')

//快速
function quisort(array) {
    checkArray(array);
    quickSort(array, 0, array.length - 1);
    return array;
}

function quickSort(array, left, right) {
    if (left < right) {
        swap(array, left, right)
        // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
        let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
        quickSort(array, left, indexs[0]);
        quickSort(array, indexs[1] + 1, right);
    }
}

function part(array, left, right) {
    let less = left - 1;
    let more = right;
    while (left < more) {
        if (array[left] < array[right]) {
            // 当前值比基准值小，`less` 和 `left` 都加一
            ++less;
            ++left;
        } else if (array[left] > array[right]) {
            // 当前值比基准值大，将当前值和右边的值交换
            // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
            swap(array, --more, left);
        } else {
            // 和基准值相同，只移动下标
            left++;
        }
    }
    // 将基准值和比基准值大的第一个值交换位置
    // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
    swap(array, right, more);
    return [less, more];
}

console.time('quicksort')
const qui = quisort(arr)
//console.log(qui);
console.timeEnd('quicksort')
//堆排序
/**
 * 原理就是组成一个大根堆或者小根堆。
 * 以小根堆为例，某个节点的左边子节点索引是 i * 2 + 1，右边是 i * 2 + 2，父节点是 (i - 1) /2。
 * 首先遍历数组，判断该节点的父节点是否比他小，如果小就交换位置并继续判断，直到他的父节点比他大
  重新以上操作 1，直到数组首位是最大值
  然后将首位和末尾交换位置并将数组长度减一，表示数组末尾已是最大值，不需要再比较大小
  对比左右节点哪个大，然后记住大的节点的索引并且和父节点对比大小，如果子节点大就交换位置
  重复以上操作 3 - 4 直到整个数组都是大根堆。
 * @param {array} array 
 */
function heap(array) {
    checkArray(array);
    // 将最大值交换到首位
    for (let i = 0; i < array.length; i++) {
        heapInsert(array, i);
    }
    let size = array.length;
    // 交换首位和末尾
    swap(array, 0, --size);
    while (size > 0) {
        heapify(array, 0, size);
        swap(array, 0, --size);
    }
    return array;
}

function heapInsert(array, index) {
    // 如果当前节点比父节点大，就交换
    while (array[index] > array[parseInt((index - 1) / 2)]) {
        swap(array, index, parseInt((index - 1) / 2));
        // 将索引变成父节点
        index = parseInt((index - 1) / 2);
    }
}

function heapify(array, index, size) {
    let left = index * 2 + 1;
    while (left < size) {
        // 判断左右节点大小
        let largest =
            left + 1 < size && array[left] < array[left + 1] ? left + 1 : left;
        // 判断子节点和父节点大小
        largest = array[index] < array[largest] ? largest : index;
        if (largest === index) break;
        swap(array, index, largest);
        index = largest;
        left = index * 2 + 1;
    }
}

console.time('heap')
const dui = heap(arr)
console.timeEnd('heap')

console.time('origin')
const origin = arr.sort((a, b) => a - b)
console.timeEnd('origin')

check(qui)
check(gui)
check(bub)
check(sel)
check(ins)
check(dui)
check(origin)

function check(arr) {
    for (let i = 0, len = arr.length - 1; i < len; i++) {
        if (arr[i + 1] < arr[i]) {
            return console.log(`检查不通过！位置：${i}，值：${arr[i]}, ${arr[i+1]}`)
        }
    }
    return console.log('检查通过')
}