const Joi = require('joi');
const { EventEmitter } = require('stream');

class PokemonValidator extends EventEmitter {
    validatePokemon(pokemon){
        const schema = Joi.object({
            id: Joi.number().integer().required(),
            pokeName: Joi.string().min(3).required()
        })

        const result = schema.validate(pokemon)
        if(result.error){
            this.emit('noValidado')
            return 0
        }

        this.emit('validado')
        return 1
    }

}

module.exports = PokemonValidator