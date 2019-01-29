function unique(origin) {
    var result = [];
    for(var i = 0; i < origin.length; i++) {
        var arrayItem = origin[i];

        for(var j= 0; j< result.length; j++) {
            var resultItem = result[j];
            
            // 如果在结果数组循环中找到了该元素，则跳出循环，进入下一个源数组元素的判断
            if(resultItem === arrayItem) {
                break;
            }
        }
        
        // 如果把结果数组循环完都没有找到该元素，就将该元素压入结果数组中
        if(j === result.length) {
            result.push(arrayItem);
        }
    }
    return result;
}

var array = ['a', 'b', 'c', '1', 0, 'c', 1, '', 1, 0];
console.log(unique(array));  // ["a", "b", "c", "1", 0, 1, ""]


function unique(origin){
    var result = [];
    for(var i = 0; i< origin.length; i++) {
        var item = origin[i];
        if(result.indexOf(item) === -1) {
            result.push(item);
        }
    }
    return result;
}


function unique(origin) {
    var result = origin.filter(function (item, index, array){
        // 获取元素在源数组的位置，只返回那些索引等于当前元素索引的值。
        return array.indexOf(item) === index;
    });
    return result;
}


function unique(origin) {
    var result = [];
    var hashTable = {};
    for(var i = 0; i< origin.length; i++) {
        // 如果键对应的值，为真，意味着对象的键中已经有重复的键了。
        if(!hashTable[origin[i]]) {
        // 将元素作为对象的键，默认键对应的值为 true, 
            hashTable[origin[i]] = true;
            
            // 如果对象中没有这个键，则将这个元素放入结果数组中去。
            result.push(origin[i]);
        }
    }
    return result;
}


function unique(origin) {
    var result = [];
    var hashTable = {};
    for(var i = 0; i< origin.length; i++) {
        var current = origin[i];
        // 字符串拼接元素的类型和元素
        var key = typeof(current) + current;
        if(!hashTable[key]) {
            hashTable[key] = true;
            result.push(current);
        }
    }
    return result;
}


function unique(origin) {
    return origin.concat.sort().filter(function(item, index, array) {
        // !index 表示第 0 个元素应该被返回。
        return !index || item !== origin[index-1]
    })
}

function unique(array) {
    array.sort(); // 排序字符串
    array.sort(function(a, b) {
        return a-b; // 排序数字
    })
    
    for(let i=0; i<array.length; i++) {
        if(array[i] === array[i+1]) {
            array.splice(i, 1);
            i--; // 应该将前一个数删除，而不是删除后一个数。是因为元素被删除之后，后面元素的索引会迁移，所以要 i--;
        }
    }
    return array;
}


function unique(origin) {
    //[...new Set(origin)]
    return Array.from(new Set(origin));
}


function unique(origin){
    const map = new Map()
    return origin.filter((item) => !map.has(item) && map.set(item, true))
}
