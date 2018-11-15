function readonly(target,name,descriptor){
    descriptor.writable=false;
    return descriptor
}

class MyClass {
    
    @readonly
    method(){
        console.log(1)
    }
}