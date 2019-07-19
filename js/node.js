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
// let arr=Array.from({length:10})
// console.log(arr);
const fs=require('fs')
const path=require('path')
const url=require('url')
const querystring = require('querystring')
const assert=require('assert')
const zlib=require('zlib')
const os=require('os')
const http2=require('http2')
console.log('plat',os.platform())
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
//fs
// writeFile,readFile异步  readFileSync,writeFileSync同步
fs.writeFile('../test.txt','hello node',err=>{
    if(err){
        console.log('wirte fail',err);
    }else{
        console.log('write success');
    }
})
fs.readFile('../test.txt',(err,data)=>{
    if(err){
        console.log('fail',err);
    }else{
        console.log(data);//二进制文件
        console.log('succees',data.toString());
    }
})
let rs = fs.createReadStream('../test.txt'); // 要读取的文件
let ws = fs.createWriteStream('../new.txt'); // 输出的文件
rs.pipe(ws)
rs.on('error',err=>console.log(err))
ws.on('finish',()=>console.log('stream success'))
//path
let str='../test.txt'
//dirname 路径 extname后缀名 
console.log(path.basename(str));//文件名
let pathOne=path.resolve('root/a','c','d')//路径解析，简单来说就是拼凑路径，最终返回一个绝对路径
let pathTwo=path.resolve(__dirname,'build')
console.log(pathOne,pathTwo);
//url
let site='http://www.xr.com/a/b/index.html?a=1&b=2'
//  url.parse() 解析网址，true 的意思是把参数解析成对象
let parse=url.parse(site,true)
console.log(parse);
//queryString 解析url参数
let query = 'a=1&b=2&c=3'; 
let obj=querystring.parse(query)
console.log(obj);
let queryToString=querystring.stringify(obj)
console.log(queryToString);
const obj1 = { a: { b: 1 } };
const obj2 = { a: { b: 1 } };
const obj3 = { a: { b: '1' } };
//断言正确的话，则不会有任何提示，程序会继续默默往下执行。所以断言的作用就是先判断条件是否正确（有点像 if），如果条件返回值为 false 则阻止程序运行，
//并抛出一个错误,如果返回值为 true 则继续执行，一般用于函数中间和参数判断。
// assert.deepEqual(变量，预期值，错误信息)   变量 == 预期值
// assert.deepStrictEqual(变量，预期值，错误信息)  变量 === 预期值
assert.deepEqual(obj1, obj2, '不等哦'); // true
assert.deepEqual(obj1, obj3, '不等哦'); // true
assert.deepStrictEqual(obj1, obj2, '不等哦'); // true
// assert.deepStrictEqual(obj1, obj3, '不等哦'); // false，这个会抛出错误信息
let rjs=fs.createReadStream('./life.js')
let gz=zlib.createGzip();
let wjs=fs.createWriteStream('../life.js.gz')
rjs.pipe(gz).pipe(wjs)
rjs.on('error', err => {
    console.log(err);
  });
wjs.on('finish', () => {
    console.log('压缩成功');
  })
  const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
  });
  server.on('error', (err) => console.error(err));
  
  server.on('stream', (stream, headers) => {
    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    });
    stream.end('<h1>Hello World</h1>');
  });
  
  server.listen(8443);