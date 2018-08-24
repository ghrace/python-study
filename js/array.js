//随机整数组成的数组，数组长度和元素大小可自定义
const genNumArr = (length, limit) =>
  Array.from({ length }, _ => Math.floor(Math.random() * limit));

genNumArr(10, 100);

//将多层数组转换成一层数组
const flatten = arr =>
  arr.reduce(
    (flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next),
    []
  );
const nestedArr = [1, 2, [3, 4, [5, 6]]];
flatten(nestedArr)

//entries()转对象,key/value 对应里层数组的两个值
const objLikeArr = [["name", "Jim"], ["age", 18], ["single", true]];
const fromPairs = pairs =>
pairs.reduce((res, pair) => ((res[pair[0]] = pair[1]), res), {});
fromPairs(objLikeArr);

//取深层属性
const deepAttr = { a: { b: { c: 15 } } };
const pluckDeep = path => obj =>
  path.split(".").reduce((val, attr) => val[attr], obj);

pluckDeep("a.b.c")(deepAttr);

//