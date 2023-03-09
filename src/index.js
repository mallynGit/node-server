
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");
const Validator = require("./models/pokemon")
const validator = new Validator()
const EventEmitter = require("events");
const sql = require('mssql')






getConnection("Select * from pokeindex")

//json
app.use(express.json());

//array "base de datos"
const apiArray = [
  { id: 1, pokeName: "Bulbasaur" },
  { id: 2, pokeName: "Squirtle"  }
  ];

//configuracion
app.set("port", 3000);
const options = {
  key: fs.readFileSync("src/cert/client-key.pem"),
  cert: fs.readFileSync("src/cert/client-cert.pem"),
};

//eventlistener
validator.on("validado", () => {
  console.log("Array validado");
});

validator.on("noValidado", ()=> {
  console.log("Elemento no validado correctamente")
})

//middleware
//app.use(express.static(path.join(__dirname, "pages")));

//rutas

app.post("/api/pokemon/", (req, res) => {
  const pokemon = {
    id: apiArray.length+1,
    pokeName: req.body.pokeName
  };
  
  if(validator.validatePokemon(pokemon)===0) return res.status(400).send('El pokemon no pudo ser validado');
  
  apiArray.push(pokemon);
  res.send(JSON.stringify(apiArray))
});

app.get('/api/pokemon/:id?', (req, res) => {
  if(req.params.id===undefined){
    res.status(200).send(JSON.stringify(apiArray))
    console.log('no se ha especificado un pokemon a buscar')
    return
    
  }
  const busqueda = apiArray.find(p => p.id === parseInt(req.params.id))

  if(!busqueda) return res.status(404).send('Pokemon no encontrado');

  res.status(200).send(busqueda)
})

app.put('/api/pokemon/', (req, res) => {
  const pokemon = {
    id: req.body.id, 
    pokeName: req.body.pokeName
  }

  const busqueda = apiArray.find(p => p.id === parseInt(req.body.id))

  if(!busqueda) return res.status(404).send('ID no encontrada');
    
  if(validator.validatePokemon(pokemon)===0) return res.status(400).send('El pokemon no pudo ser validado');

  busqueda.pokeName = req.body.pokeName
  res.status(200).send('Pokemon actualizado correctamente')
})

app.delete('/api/pokemon', (req, res) => {
  const busqueda = apiArray.find(p => p.id === parseInt(req.body.id))
  const index = apiArray.indexOf(busqueda)
  console.log(apiArray.splice(index, 1))

  if(!busqueda) return res.status(404).send('No se puede borrar un pokemon que no existe');

  apiArray.splice(index, 0)
  res.send(busqueda)

})

//servidor http y https
http.createServer(app).listen(80, () => {
  console.log("Servidor HTTP abierto en el puerto 80");
});

https.createServer(options, app).listen(443, () => {
  console.log("Servidor HTTPS abierto en el puerto 443");
});

// Loguea en la consola cada vez que se recibe una conexion
// server.on("connection", (socket) => {
//   console.log("Conexion recibida");
// });
