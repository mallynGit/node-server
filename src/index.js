
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const db = require('./db/connection')
const cfg = require('./config')

app.use(express.json())
app.use(require('./routes/pkmnroutes'))

//servidor http y https
http.createServer(app).listen(80, () => {
  console.log("Servidor HTTP abierto en el puerto 80");
});

https.createServer(cfg.options, app).listen(443, () => {
  console.log("Servidor HTTPS abierto en el puerto 443");
  db.createTable('backrooms')

});

// Loguea en la consola cada vez que se recibe una conexion
// server.on("connection", (socket) => {
//   console.log("Conexion recibida");
// });
