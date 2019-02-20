function readonly(target,name,descriptor){
    descriptor.writable=false;
    return descriptor
}

class MyClass {
    constructor(){

    }
    
    @readonly
    method(){
        console.log(1)
    }
}