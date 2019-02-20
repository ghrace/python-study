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
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('tom');
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
var b = 'ss';
console.log(greeter(user));
