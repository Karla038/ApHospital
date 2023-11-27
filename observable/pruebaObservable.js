const Publisher = require('./Publisher');

const publisher = new Publisher();


const mensaje = () => {
    console.log('Karla bebe preciosa')
}


publisher.suscribe('FirstLogger',console.log)

publisher.suscribe('Hola',mensaje);

const bebe = true 
if(bebe){
    publisher.notify('Hola');
}
