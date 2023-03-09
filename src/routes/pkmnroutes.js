
const Router = require('express').Router
const rou = Router()
const pkmnController = require('../controllers/pkmncontroller')



rou.get('/api/pokemon/:id?', pkmnController.getPokemon)
rou.post('/api/pokemon', pkmnController.createPokemon)
rou.put('/api/pokemon', pkmnController.updatePokemon)
rou.delete('/api/pokemon', pkmnController.deletePokemon)

module.exports = rou