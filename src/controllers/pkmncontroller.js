const { getConnection } = require("../db/connection");
const validate = require('../middleware/validator').validate
const schema = require('../models/schema')

/**
 * returns a specified pokemon
 * @param {*} req request 
 * @param {*} res response
 */
const get = async (req, res) => {
  try {
    const pool = await getConnection();
      const result = await pool
        .request()
        .query(
          `select * from pokemon.dbo.pokeindex where id like ${req.params.id}`
        );
      res.status(200).send(String(result.recordset[0].id))
      
  } catch (err) {
    console.log(err);
    res.status(400).send('Comprueba que se han introducido bien los datos.');
  }
};

/**
 * returns all pokemon
 * @param {*} req request
 * @param {*} res response
 */
const getAll = async (req, res) =>{
  try{
    const pool = await getConnection()
    

    res.status(200).send((await pool.request().query('select * from pokemon.dbo.pokeindex')).recordsets)
  }catch(err){
    console.log(err)
    res.status(400)
  }
}
/**
 * creates a pokemon using only pokeName as the body
 * @param {*} req request
 * @param {*} res response
 */
const create = async (req, res) => {
  try {
    if(req.body.pokeName===undefined){
      throw new Error('No hay pokename')
    }
    if(validate(schema.pokemonSchema,req.body).error){
        throw new Error('No se ha validado')
    }
    
    const pool = await getConnection();
    
    const result = await pool
      .request()
      .query(
        `insert into pokemon.dbo.pokeindex values ('${req.body.pokeName}')`
      );
      console.log(result)
    res.status(200).send((await pool.request().query(`select * from pokemon.dbo.pokeindex where pokeName = '${req.body.pokeName}'`)).recordsets)
    
  } catch (err) {
    console.log(err.message);
    res.status(400).send('Comprueba que se han introducido los datos del cuerpo bien');
  }
};
/**
 * updates a pokemon taking the ID of the pokemon to update and the name to update it with as pokeName
 * @param {*} req request
 * @param {*} res response
 */
const update = async (req, res) => {
  try {
    if(req.body.id===undefined||req.body.pokeName===undefined){
      throw new Error('No se puede actualizar sin ID o nombre')
    }
    if(validate(schema.pokemon,req.body).error){
      throw new Error('No se pudo validar el documento')
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `update pokemon.dbo.pokeindex set pokeName = '${req.body.pokeName}' where id = ${req.body.id}`
      );
    if (result.rowsAffected == 0) {
      res.status(404).send("Error: no se pudo actualizar el pokemon");
    } else {
      res
        .status(200)
        .send(`Pokemon con ID ${req.body.id} actualizado correctamente`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Error: comprueba que en el body hayas escrito los datos correctamente');
  }
};
/**
 * deletes a pokemon specified by id
 * @param {*} req request
 * @param {*} res repsonse
 */

const remove = async (req, res) => {
  try {
    const pool = await getConnection();
    const name = await pool.request().query(`select * from pokemon.dbo.pokeindex where id = '${req.body.id}'`)
    
    const result = await pool
      .request()
      .query(
        `delete from pokemon.dbo.pokeindex where id = '${req.body.id}'`
      );
      
    if (result.rowsAffected[0] === 0) {
      res.status(200).send(result.rowsAffected);
    } else {
      res.status(200).send((`${name.recordset}, pokemon borrado correctamente`));
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Error: no se pudo borrar el pokemon');
  }
};

module.exports.get = get;
module.exports.getAll = getAll
module.exports.create = create;
module.exports.update = update;
module.exports.delete = remove;
