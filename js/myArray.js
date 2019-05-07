//手写array的方法

// forEach 支持传入两个参数，callback、thisArg
// callback 返回3个参数，当前元素、当前元素索引、原数组
// thisArg 传入后，改变 callback 的 this 指针
Array.prototype.myforeach = function (fn, context = null) {
    let index = 0;
    let arr = this;
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < arr.length) {
        if (index in arr) { // 数组的下标并不一定是连续的
            fn.call(context, arr[index], index, arr);
        }
        index ++;
    }
  };

 //支持async /awiat 
Array.prototype.myforeachSync = async function (fn, context = null) {
    let index = 0;
    let arr = this;
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < arr.length) {
        if (index in arr) {
            try {
                await fn.call(context, arr[index], index, arr);
            } catch (e) {
                console.log(e);
            }
        }
        index ++;
    }
};

// 参数和forEach一样
// callback 需要有一个返回值
Array.prototype.mymap = function (fn, context = null) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    let newArr = [];
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < len) {
        if (index in arr) {
            let result = fn.call(context, arr[index], index, arr);
            newArr[index] = result; // 返回值作为一个新数组
        }
        index ++;
    }
    return newArr;
};

Array.prototype.myreduce = function (...arg) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    let fn = arg[0], result;
    if (arg.length >= 2) { // 判断是否有第二个参数，有的话作为回调函数运行的初始值
        result = arg[1];
    } else {
        // reduce 在没有第二个参数的时候，会把数组的第一项作为回调的初始值
        // 第一项并不一定是 a[0]
        while (index < len && !(index in arr)) {
        // 下标小于数组长度且下标不属于该数组就一直循环，用来找到数组的第一项
            index++;
        }
        if (index >= len) { // 如果第一项大于等于数组长度，则说明是空数组
            throw new TypeError( '空数组且没有初始值' );
        }
        result = arr[index++]; // 赋值之后下标+1
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < len) {
        if (index in arr) {
            result = fn(result, arr[index], index, arr); // 每次回调的返回值，都会传入下次回调
        }
        index ++;
    }
    return result;
};
//reduce 实现map
Array.prototype.mapByreduce = function (fn, context = null) {
    let arr = this;
    if (typeof fn !== 'function') {
         throw new TypeError(fn + ' is not a function');
    }
    return arr.reduce((pre, cur, index, array) => {
        let res = fn.call(context, cur, index, array);
        return [...pre, res]; // 返回一个新数组
    }, []);
};

Array.prototype.myfilter = function (fn, context = null) {
    let arr = this;
    let len = arr.length;
    let index = 0, k = 0;
    let newArr = [];
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < len) {
        if (index in arr) {
            let result = fn.call(context, arr[index], index, arr);
            if (result) newArr[k++] = arr[index]; // 如果返回值为真，就添加进新数组
        }
        index ++;
    }
    return newArr;
};

Array.prototype.myfind = function (fn, context = null) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < len) {
        if (index in arr) {
            let result = fn.call(context, arr[index], index, arr);
            if (result) return arr[index]; // 满足条件就返回
        }
        index ++;
    }
    return undefined;
};

Array.prototype.mysome = function (fn, context = null) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < len) {
        if (index in arr) {
            let result = fn.call(context, arr[index], index, arr);
            if (result) return true; // 找到一个满足的，立即返回true
        }
        index ++;
    }
    return false; // 找不到返回 false
};

Array.prototype.myevery = function (fn, context = null) {
    let arr = this;
    let len = arr.length;
    let index = 0;
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < len) {
        if (index in arr) {
            let result = fn.call(context, arr[index], index, arr);
            if (!result) return false; // 有一个不满足，就返回false
        }
        index ++;
    }
    return true;
};

Array.prototype.myincludes = function (val, fromIndex = 0) {
    let arr = this;
    let len = arr.length;
    let k = Math.max(fromIndex >= 0 ? fromIndex : len - Math.abs(fromIndex), 0);
    // 允许传入负数，意为从倒数第几位开始查找
    // 负数依然是按升序查找
    // 避免传入负数绝对值大于len而使k出现负数，k设置最小值 0 
    function check(x, y) {
        return x === y ||
        (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        // 判断 NaN
    }
    while (k < len) {
        if (k in arr) {
            if (check(val, arr[k])) return true; // 找到一个符合条件的，返回 true
        }
        k ++;
    }
    return false; // 没找到 返回false
};

// indexOf 不支持查找 NaN 
Array.prototype.myindexOf = function (val, fromIndex = 0) {
    let arr = this;
    let len = arr.length;
    let k = Math.max(fromIndex >= 0 ? fromIndex : len - Math.abs(fromIndex), 0);
    // 处理负数
    while (k < len) {
        if (k in arr) {
            if (val === arr[k]) return k; // 找到返回下标
        }
        k ++;
    }
    return -1; // 找不到返回 -1
};

Array.prototype.myjoin = function (connector = ',') {
    let arr = this;
    let len = arr.length;
    let str = '';
    let k = 0;
    while (k < len) {
        if (k in arr) {
            if (k === len -1) { // 最后一位不用连接
                str += arr[k];
            } else {
                str += arr[k] + connector.toString();
            }
        }
        k ++;
    }
    return str;
};