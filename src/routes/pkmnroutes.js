
const Router = require('express').Router
const rou = Router()
const pkmnController = require('../controllers/pkmncontroller')

//las rutas que usara para hacer las operaciones de CRUD, GET admite un parametro de id por si quieres buscar un pokemon en especifico

rou.get('/api/pokemon/getAll', pkmnController.getAll)
rou.get('/api/pokemon/get/:id?', pkmnController.get)
rou.post('/api/pokemon/create', pkmnController.create)
rou.put('/api/pokemon/update', pkmnController.update)
rou.delete('/api/pokemon/delete', pkmnController.delete)

module.exports = rou