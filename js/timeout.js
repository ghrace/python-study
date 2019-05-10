// const timeout =require('test-timeout')
import timeout from 'test-timeout'
console.log(timeout)
//sleep
// function timeout(ms) {
//   return new Promise(resolve => {
//     setTimeout(resolve, ms)
//   })
// }

async function asyncPrint(value, ms) {
  await timeout(ms)
  console.log(value)
}
asyncPrint('hhh',1000)
