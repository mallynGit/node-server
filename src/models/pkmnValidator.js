const Joi = require('joi');



    function validatePokemon(pokemon){
        const schema = Joi.object({
            id: Joi.number().integer().required(),
            pokeName: Joi.string().min(3).required()
        })
        const result = schema.validate(pokemon)
        
        return result
    }


module.exports.validatePokemon = validatePokemon