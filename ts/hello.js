// function sayHe(person:string){
//     return 'hello' +person
// }
// let user='tom'
// console.log(sayHe(user))
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.sayHi = function () {
        return "my name is " + this.name;
    };
    return Animal;
}());
var a = new Animal('tom');
console.log(a.sayHi());
