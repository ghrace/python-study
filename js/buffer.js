// const buf1=Buffer.alloc(10)
// const buf2=Buffer.from('hello buffer')

// console.log(buf1.toJSON());
// console.log(buf2.toJSON());
// console.log(buf1.length);
// console.log(buf2.length);
// buf1.write('new data')
// console.log(buf1.toString());

// try{
//     foo()
// } catch (e){
//     throw new Error(e)
// } finally{
//     console.log('done');
// }
let arr=Array.from({length:10})
console.log(arr);
const loop=()=>{
    let arr=new Array(100000).fill(1)
    for(let item of arr){
        return item*2
    }
}
console.time('im')
const Imid=setImmediate(loop)
console.timeEnd('im')
clearImmediate(Imid)

console.time('timeout')
const outId=setTimeout(loop,0)
console.timeEnd('timeout')
clearImmediate(outId)