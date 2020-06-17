function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return Object.prototype.toString.call(value)
}
//检测是否是一个非 null 的对象。
function isObjectLike(value) {
    return typeof value == 'object' && value !== null
}

function isNumber(value) {
    return typeof value == 'number' ||
        (isObjectLike(value) && getTag(value) == '[object Number]')
}
function isInteger(value) {
    return typeof value == 'number'
        && value == toInteger(value);
}
function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ?
        (remainder ? result - remainder : result) : 0;
}
//lodash
function isNaN(value) {
    return isNumber(value) && value != +value;
}

// js native isNaN
var isNaN = function (value) {
    var n = Number(value);
    return n !== n;
};

function isFinite(value) {
    return typeof value == 'number'
        && nativeIsFinite(value);
}

function isString(value) {
    const type = typeof value
    return
    type == 'string' ||
        (type == 'object'
            && value != null
            && !Array.isArray(value)
            && getTag(value) == '[object String]')
}

function isBoolean(value) {
    return
    value === true || value === false ||
        (isObjectLike(value)
            && getTag(value) == '[object Boolean]')
}

function isSymbol(value) {
    const type = typeof value
    return type == 'symbol' ||
        (isObjectLike(value) &&
            getTag(value) == '[object Symbol]')
}

function isUndefined(value) {
    return value === undefined;
}

function isNull(value) {
    return value === null
}

function isObject(value) {
    const type = typeof value
    return value != null &&
        (type == 'object' || type == 'function')
}

function isFunction(value) {
    if (!isObject(value)) {
        return false
    }

    const tag = getTag(value)
    return tag == '[object Function]' ||
        tag == '[object AsyncFunction]' ||
        tag == '[object GeneratorFunction]' ||
        tag == '[object Proxy]'
}
