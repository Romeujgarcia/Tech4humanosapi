const { Router} = require('express');
const router = Router();

const {getUsers, createUser, getUserById, deleteUser, UpdateUser, Buscar, ConsultarBanco} = require('../controllers/index.controllers');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', UpdateUser);
router.post('/buscar', Buscar);
router.get('/consultar', ConsultarBanco);

module.exports = router;