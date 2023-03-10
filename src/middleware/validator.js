/**
 * valida un objeto a partir de un schema
 * @param {*} schema schema a seguir
 * @param {*} object objeto a validar
 * @returns boolean
 */

function validate(schema, object){
    const result = schema.validate(object)
    return result
}

module.exports.validate = validate