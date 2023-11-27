const Suscriber = require('./Subscriber');

class Publisher {
    constructor(){
        this.suscribers = [];
    }


    suscribe(name,callback){
        const suscriberToAdd = new Suscriber(name,callback);
        this.suscribers.push(suscriberToAdd);
    }

    describe(name){
        this.suscribers = this.suscribers.filter(subscriber => subscriber.name !== name);
    }
    notify(message){
        this.suscribers.forEach(suscriber => suscriber.notify(message));
    }
}


module.exports = Publisher;
