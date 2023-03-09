const sql = require('mssql')
const config = {
  user: 'operator',
  password: 'pokemonoperator123',
  server: 'localhost',
  database: 'pokemon',
  options:{
    trustServerCertificate:true,
  },
}


async function getConnection(){
  const pool = await sql.connect(config)
  return pool
}

async function createTable(name){
  const pool = await sql.connect(config)
  const result = pool.request().query(`use pokemon; drop table if exists ${name}; create table ${name}( id int, name nvarchar(50))`)
}


module.exports.getConnection = getConnection
module.exports.createTable = createTable