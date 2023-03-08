const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const https = require("https");
const fs = require("fs");
const mod = require('./modules/modulo')

//configuracion
app.set("port", 3000);
const options = {
  key: fs.readFileSync("src/cert/client-key.pem"),
  cert: fs.readFileSync("src/cert/client-cert.pem"),
};

//middleware
app.use(express.static(path.join(__dirname, "pages")));

//rutas
app.get("/", (request, response) => {
  response.send("Bienvenido");
});

// app.listen(app.get('port'), ()=>{
//     console.log(`Aplicacion ejecutandose en el puerto ${app.get('port')}`)
// })

//lo demas
http.createServer(app).listen(80, () => {
  console.log("Servidor HTTP abierto en el puerto 80");
});
https.createServer(options, app).listen(443, () => {
  console.log("Servidor HTTPS abierto en el puerto 443"),
  console.log(mod.moduloMsg)
});
