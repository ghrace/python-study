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
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
console.log(1 /* DOWN */);
function greeter(person) {
    return 'hello,' + person.firstName + ' ' + person.lastName;
}
var user = new Student('jack', 'M.', 'john');
console.log(greeter(user));
