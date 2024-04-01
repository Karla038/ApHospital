const Suscriber = require('./Suscriber');


// El Publisher actúa como el Sujeto. 

class Publisher {   
    constructor(){                                  //Se ejecuta al crear una instancia
        this.suscribers = [];                   //Se incializa la propiedad subscribers. Es un arreglo vacio que va a                                           mantener una lista de todos los observadores (suscriptores).
    }

    //name es el identificador del suscriptor y callback es la función que se llamará cuando ocurra un evento.
    //Crea una nueva instancia de Subscriber con el name y callback proporcionados, y la asigna a la variable local subscriberToAdd.
    //Aqui se agrega la subscripcion al arreglo subscribers
    

    suscribe(name,callback){  
        const suscriberToAdd = new Suscriber(name,callback); 
        this.suscribers.push(suscriberToAdd);                               
    }

    //Permite a un observador darse de baja o cancele su suscripción.
    //Actualiza la lista de subscribers y elimina el suscriptor deseado de la lista.

    unsubscribe(name) { 
        this.subscribers = this.subscribers.filter(subscriber => subscriber.name !== name); 
    }


    //Usado para notificar a todos los observadores de un evento.
    //Iteración de todos los subscribers y el llamado al método notify de cada uno, pasando el message como argumento.
    
    notify(message){ 
        this.suscribers.forEach(suscriber => suscriber.notify(message)); 
    }
}


module.exports = Publisher;
  