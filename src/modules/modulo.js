const mensaje = "Modulo exportado";
const EventEmitter = require("events");


class Modulo extends EventEmitter {
  enviar(msg) {
    console.log(msg);
     this.emit("mandado");
  }
}

module.exports = Modulo;
