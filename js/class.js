class Polygon{
    constructor(){
        this.name='polygon'
    }
}

class Square extends Polygon{
    constructor(length){
        super(length,length);
        this.name='square'
    }
    get area(){
        return this.height*this.width;
    }
    set area(val){
        this._area=val
    }
}

class StaticCall{
    constructor(){
        this.name='static'
    }
    getName(){
        return this.name+'sv'
    }
    static getStatic(){
        return 'Static call'
    }
    static another(){
        return this.getStatic()+'another'
    }
}

const s1=new StaticCall();
console.log(s1.getStatic());
console.log(StaticCall.getStatic());

function debounce1(func,wait=50){
    let timer=0;
    return function(...args){
        if(timer) clearTimeout(timer)
        timer=setTimeout(() =>{
            func.apply(this.args)
        },wait)
    }
}

function now(){
    return +new Date()
}

function debounce2(func,wait=50,immediate=true){
    let timer,context,args
    const later=()=>{
        setTimeout(() => {
            timer=null;
            if(!immediate){
                func.apply(context,args)
                context=args=null
            }
        }, wait);
    }
    return function(...params){
        if(!timer){
            timer=later()
            if(immediate){
                func.apply(this,params)
            }else{
                context=this
                args=params
            }
        }else{
            clearTimeout(timer);
            timer=later()
        }
    }
}