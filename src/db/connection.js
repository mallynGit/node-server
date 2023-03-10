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

/**
 * realiza una conexion y la devuelve para que otros modulos la utilicen
 * @returns database connection
 */
async function getConnection(){
  const pool = await sql.connect(config)
  return pool
}

/**
 * crea una tabala en la base de datos con el nombre especificado
 * @param {*} name nombre de la tabla a crear
 */
async function createTable(name){
  const pool = await sql.connect(config)
  const result = pool.request().query(`use pokemon; drop table if exists ${name}; create table ${name}( id int, name nvarchar(50))`)
}


module.exports.getConnection = getConnection
module.exports.createTable = createTable