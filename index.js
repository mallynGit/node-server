const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')

//configuracion
app.set('port', 3000)
const options = {
    key: fs.readFileSync('client-key.pem'),
    cert: fs.readFileSync('client-cert.pem')
}

//middleware
app.use(express.static(path.join(__dirname, 'pages')))

//rutas
app.get('/', (request, response)=>{
    response.send('Bienvenido')
})

// app.listen(app.get('port'), ()=>{
//     console.log(`Aplicacion ejecutandose en el puerto ${app.get('port')}`)
// })

//lo demas
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);