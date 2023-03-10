const fs = require('fs')

//dejo el certificado de SSL en otro archivo para tener el index un poco mas limpio

const options = {
    key: fs.readFileSync("src/cert/client-key.pem"),
    cert: fs.readFileSync("src/cert/client-cert.pem")
  };

  module.exports.options = options