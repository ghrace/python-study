// JS 的 Timer 并不是非常准的，
// 掉配计算资源有先后，且同时可支持的 timer 是有限的。

let list=[3,4,3,5,34,5,6,7,2,13,11]
let newList=[]
list.forEach(item =>{
    setTimeout(() => {
        newList.push(item)
    }, item*100)
})