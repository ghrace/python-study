//原型链继承
//原型链继承里面，使用的都是同一个内存里的值，
// 这样修改该内存里的值，其他继承的子类实例里的值都会变化
function Parent(){
    this.name='John'
}
Parent.prototype.getName=function(){
    console.log(this.name)
}
function Child(){
}
Child.prototype=new Parent()
let c1=new Child()
c1.getName()

//构造函数继承
/**
 *避免了引用类型的属性被所有实例共享
可以在child中向parent传参
因为方法都在构造函数中定义，每次创建实例都会创建一遍方法。 
 */
function Animal(name){
    this.name=name
}
function Dog(name){
    Animal.call(this,name)
}
let d1=new Dog('ww')
console.log(d1.name)

//组合继承
function student(name){
    this.name = name;
    this.hobbies = ["sing","dance","rap"];
}

function greatStudent(name,age){
    student.call(this,name);
    this.age = age;
}

// 每个对象都有构造函数，原型对象也是对象，也有构造函数，这里简单的把构造函数理解为谁的构造函数就要指向谁
// 第一句将子类的原型对象指向父类的实例对象时，同时也把子类的构造函数指向了父类
// 我们需要手动的将子类原型对象的构造函数指回子类
greatStudent.prototype = new student();
greatStudent.prototype.constructor = greatStudent;

//原型式继承
//包含引用类型的属性值始终会共享相应的值，这点跟原型链继承一样
//Object.create()
function createObj(o){
    function F(){};
    F.prototype = o;
    return new F();
  }
let person = {
    name:'JoseyDong',
    hobbies:['sing','dance','rap']
}

let person1 = createObj(person);

//寄生式继承
function create(o){
    let clone = Object.create(o);
    clone.sayName = function(){
        console.log('hi');
    }
    return clone
}

//寄生组合式继承
// 寄生组合式继承
/**
 * 这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
 * 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
 * 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 */
function student(name){
    this.name = name;
    this.hobbies = ["sing","dance","rap"];
}

function greatStudent(name,age){
    student.call(this,name);
    this.age = age;
}
//避免重复调用
// 使用F空函数当子类和父类的媒介 是为了防止修改子类的原型对象影响到父类的原型对象
let F = function(){};
F.prototype = student.prototype;
greatStudent.prototype = new F();

//ES6继承
// ES6 

class parents {
    constructor(){
        this.grandmather = 'rose';
        this.grandfather = 'jack';
    }
}

class children extends parents{
    constructor(mather,father){
    //super 关键字，它在这里表示父类的构造函数，用来新建父类的 this 对象。
        super();
        this.mather = mather;
        this.father = father;
    }
}

let child = new children('mama','baba');
console.log(child) // =>
// 核心代码
function _inherits(subType, superType) {
    subType.prototype = Object.create(superType && superType.prototype, {
      constructor: {
        value: subType,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superType) {
      Object.setPrototypeOf 
      ? Object.setPrototypeOf(subType, superType) 
      : subType.__proto__ = superType;
    }
  }
  
/**
 ES5 的继承实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.call(this)）。
ES6 的继承机制实质是先创造父类的实例对象 this （所以必须先调用 super() 方法），然后再用子类的构造函数修改 this。

子类的 proto 属性：表示构造函数的继承，总是指向父类。 
子类 prototype 属性的 proto 属性：表示方法的继承，总是指向父类的 prototype 属性。

ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的
 */
