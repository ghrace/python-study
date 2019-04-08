function redbag(count,p){
    let left=count
    let result=new Array(p)
    let sum=0;
    for(let i=0;i<p-1;i++){
        let random=+(Math.random()*left).toFixed(2)
        // if(random<0.01){
        //     random=0.01
        // }
        result[i]=random
        sum+=random
        left=left-result[i]
    }
    result[p-1]=+(count-sum).toFixed(2)
    console.log(result);
}
// redbag(10,5)
function test(s1){
    let obj={}
    let result=''
    let str=s1.toLowerCase()
    for(let item of str){
        if(obj[item]){
            obj[item]++
        }else{
            obj[item]=1
        }
    }
    for(let key in obj){
        result+=`${key}${obj[key]>1?obj[key]:''}`
    }
    console.log(result);
}
// test('aabccccaaa')

(function(){
    var a=b=5
})()
console.log(b);

// class Sample extends Component{
//     constructor(){

//     }
//     static getDerivedStateFromProps(nextProp,preState){
//         return 
//     }
//     shouldComponentUpdate(nextProp,nextState){

//     }
//     render(){

//     }
//     getSnapshotBeforeUpdate(){

//     }
//     compoentDidMount(){

//     }
//     componentDidUpdate(){

//     }
//     compoentWillUnmount(){

//     }
//     //不建议使用
//     componentWillUpdate(nextProp,nextState){

//     }
//     componentWillReceiveProps(nextProp){
        
//     }
// }
for(let i=1;i<=20;i++){
    for(let j=1;j<=33;j++){
        let z=100-i-j
        if((i*5+j*3+z/3)==100){
            console.log(i,j,z);
        }
    }
}