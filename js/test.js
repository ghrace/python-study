function foo(){
    console.log(foo);
    foo.abc=function(){
        console.log(1);
    }
    this.abc=function(){
        console.log(2);
    }
    abc=function(){
        console.log(3);
    }
    var abc=function(){
        console.log(4);
    }
}
foo.prototype.abc=function(){
    console.log(11);
}
foo.abc=function(){
    console.log(12324);
}
var f=new foo()
f.abc()
foo.abc();

function swap(arr, n1, n2) {
  [arr[n1], arr[n2]] = [arr[n2], arr[n1]]
}
// 洗牌
function shuffle(cards){
    for(let i=cards.length-1;i>=0;i--){
        let randomIndex=Math.floor(Math.random()*i)
        swap(cards,randomIndex,i)
    }
    return cards
}
function pigIt(str){
    //Code here
    let list=str.split(' ')
    const final= list.map(item=>{
      let str=item.split('')
      let str0=str[0]
      str.shift()
      str.push(str0)
      if(/\w/.test(str)){
          str=str.join('')+'ay'
      }
      return str
    })
  return final.join(' ')
}


function pigIt1(str){
    // return str.replace(/\w+/g, (w) => {
    //     return w.slice(1) + w[0] + 'ay';
    //   });
    return str.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3")
  }
pigIt2 = s => s.split(' ').map(e => e.substr(1) + e[0] + 'ay').join(' ');

class Animal{
    constructor(type,age){
        this.type=type
        this.age=age
    }

    walk(){
        console.log('animal walk');
    }
}

class Dog extends Animal{
    constructor(sex,...args){
        super(...args)
        this.sex=sex
    }
    
    walk(){
        super.walk()
        console.log('dog walk');
    }
}

const dog=new Dog('male','pet',22)
dog.walk()
console.log(dog.type,dog.sex);