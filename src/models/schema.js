const Joi = require('joi');

    const pokemon = {
        id: Joi.number().integer(),
        pokeName: Joi.string().min(3)
    }

    const pokemonSchema = Joi.object(pokemon)

module.exports.pokemonSchema = pokemonSchema