// function sayHe(person:string){
//     return 'hello' +person
// }
// let user='tom'
// console.log(sayHe(user))

// class Animal{
//     constructor(name){
//         this.name=name;
//     }
//     sayHi(){
//         return `my name is ${this.name}`
//     }
// }

// let a=new Animal('tom')
// console.log(a.sayHi())

// interface Person {
//     name:string;
//     age:number;
// }

// let tom: Person={
//     name:'te',
//     age:23
// }

// const AGE=23

// class Animal{
//     private name;
//    public constructor(name){
//        this.name=name
//    }
// }

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
    }
}
const enum Directions {
    UP, DOWN, LEFT, RIGHT
}
console.log(Directions.DOWN)
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    return 'hello,' + person.firstName + ' ' + person.lastName
}
let user = new Student('jack', 'M.', 'john')
console.log(greeter(user))