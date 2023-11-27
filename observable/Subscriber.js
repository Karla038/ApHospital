class Suscriber{
    // 'guardaCitas',funcion
    constructor(name,callback){
        this.name = name;
        this.callback = callback;
    }
    notify(message){
        this.callback(message);
    }    
}
module.exports = Suscriber;




