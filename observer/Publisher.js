const Suscriber = require('./Subscriber');

class Publisher {
    constructor(){
        this.suscribers = [];
    }


    suscribe(name,callback){
        const suscriberToAdd = new Suscriber(name,callback);
        this.suscribers.push(suscriberToAdd);
    }

    unsubscribe(name) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber.name !== name);
      }

    notify(message){
        this.suscribers.forEach(suscriber => suscriber.notify(message));
    }
}


module.exports = Publisher;
  