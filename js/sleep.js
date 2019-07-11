//promise
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
  }
  
  sleep(1000).then(() => {
      // 这里写你的骚操作
  })
  //Generator
function* sleepGenerator(time) {
    yield new Promise(function(resolve,reject){
      setTimeout(resolve,time);
    })
  }
  sleepGenerator(1000).next().value.then(()=>{console.log(1)})
  //async
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve,time))
  }
async function output() {
    let out = await sleep(1000);
    console.log(1);
    return out;
}
output();
//ES5
function sleep(callback,time) {
    if(typeof callback === 'function')
      setTimeout(callback,time)
  }
  
  function output(){
    console.log(1);
  }
  sleep(output,1000);
  //date
  function sleep(duration){
    startTime = Date.now();
    while ( Date.now() - startTime < duration );
  }
  sleep(3000);
  console.info("sleeped 3sec!") 
//   call is better than apply