// Por otro lado, la clase Subscriber representa los Observadores.

class Suscriber{

    // 'Guarda las citas' función
    //asigna el valor del parámetro name a una propiedad de la instancia de la clase llamada name. El this hace referencia al objeto actual que se está construyendo.
    //signa el valor del parámetro callback a una propiedad de la instancia de la clase llamada callback. Los callbacks en JavaScript son funciones que se pasan como argumentos a otras funciones para ser ejecutadas más tarde.
    constructor(name,callback){ 
        this.name = name;  
        this.callback = callback; 
    }


    //Cuando se quiere notificar al suscriptor de un mensaje.
    //Se llama a la función callback, pasando message como argumento.  

    notify(message){ 
        this.callback(message); 
    }
    
}


module.exports = Suscriber;



