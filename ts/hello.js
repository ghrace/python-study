"use strict";
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
class Animal {
    constructor(name) {
        this.name = name;
    }
}
let a = new Animal('tom');
class Student {
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}
console.log(1 /* DOWN */);
function greeter(person) {
    return 'hello,' + person.firstName + ' ' + person.lastName;
}
let user = new Student('jack', 'M.', 'john');
let b = 'ss';
console.log(greeter(user));
