const express = require('express')
const app = express()
const path = require('path')

//configuracion
app.set('port', 3000)

//middleware
app.use(express.static(path.join(__dirname, 'pages')))

//rutas
app.get('/', (request, response)=>{
    response.send('Bienvenido')
})

app.listen(app.get('port'), ()=>{
    console.log(`Aplicacion ejecutandose en el puerto ${app.get('port')}`)
})