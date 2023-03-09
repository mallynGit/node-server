const { getConnection } = require("../db/connection");
const v = require('../models/pkmnValidator')


const readPokemon = async (req, res) => {
  try {
    if(v.validatePokemon(req.body).error){
        throw new Error('No se ha validado')
    }
    const pool = await getConnection();
    if (req.params.id === undefined) {
      const result = await pool
        .request()
        .query("select * from pokemon.dbo.pokeindex");
      res.send(JSON.parse(JSON.stringify(result.recordsets)));
    } else {
      const result = await pool
        .request()
        .query(
          `select * from pokemon.dbo.pokeindex where id like ${req.params.id}`
        );
      res.status(200).send(JSON.parse(JSON.stringify(result.recordsets)));
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('la cagaste');
  }
};

const createPokemon = async (req, res) => {
  try {
    if(v.validatePokemon(req.body).error){
        throw new Error('No se ha validado')
    }
    const pool = await getConnection();
    let lastIdJSON = JSON.parse(
      JSON.stringify(
        (
          await pool
            .request()
            .query(
              "select top 1 id from pokemon.dbo.pokeindex order by id desc"
            )
        ).recordset
      )
    )[0].id;
    const result = await pool
      .request()
      .query(
        `insert into pokemon.dbo.pokeindex values ('${lastIdJSON + 1}', '${
          req.body.pokeName
        }')`
      );
    res
      .status(200)
      .send(
        JSON.parse(
          JSON.stringify({ id: lastIdJSON + 1, pokeName: req.body.pokeName })
        )
      );
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

const updatePokemon = async (req, res) => {
  try {
    if(v.validatePokemon(req.body).error){
        throw new Error('No se ha validado')
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
    res.status(400).send();
  }
};

const deletePokemon = async (req, res) => {
  try {
    if(v.validatePokemon(req.body).error){
        throw new Error('No se ha validado')
    }
    const id = req.body.id;
    const pool = await getConnection();
    const name = JSON.parse(
      JSON.stringify(
        (
          await pool
            .request()
            .query(
              `select pokeName from pokemon.dbo.pokeindex where id like ${req.body.id}`
            )
        ).recordset
      )
    )[0].pokeName;
    const result = await pool
      .request()
      .query(
        `delete from pokemon.dbo.pokeindex where id like ${req.body.id} or pokeName like '${req.body.pokeName}'`
      );
    if (result.rowsAffected[0] === 0) {
      res.status(200).send(result.rowsAffected);
    } else {
      res.status(200).send(`Pokemon ${name} borrado correctamente`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

module.exports.getPokemon = readPokemon;
module.exports.createPokemon = createPokemon;
module.exports.updatePokemon = updatePokemon;
module.exports.deletePokemon = deletePokemon;
