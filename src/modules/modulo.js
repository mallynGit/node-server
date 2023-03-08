const mensaje = 'Modulo exportado'

function enviar(msg){
    console.log(mensaje)
}

module.exports.enviar = enviar
module.exports.moduloMsg = mensaje