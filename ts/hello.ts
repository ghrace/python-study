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
class Animal{
    private name:string;
   public constructor(name:string){
       this.name=name
   }
}
let a=new Animal('tom')



class Student {
  fullName: string
  constructor(public firstName:string, public middleInitial:string, public lastName:string) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
  }
}
const enum Directions {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Directions.DOWN)
interface Person {
  firstName: string
  lastName: string
}
function greeter(person: Person) {
    return 'hello,' + person.firstName + ' ' + person.lastName
}
let user = new Student('jack', 'M.', 'john')
let b:string='ss'
console.log(greeter(user))
let list: number[]=[1,3]
let list1: Array<number>=[2,3]
const tuple: [number,string]=[23,'str']
enum Color{
  Red=1,
  Green=2
}
function sayName(name:string): string{
  console.log(name);
  return name
}
interface Name{
  name?:string;
  readonly firstName:string;
}
type Names={
  name:string
}
type User=Names & {age:number}