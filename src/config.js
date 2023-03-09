const fs = require('fs')

const options = {
    key: fs.readFileSync("src/cert/client-key.pem"),
    cert: fs.readFileSync("src/cert/client-cert.pem")
  };

  module.exports.options = options