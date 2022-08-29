const Router = require('express');
const router = Router();
const middleware = require('../../validators/middleware');
const { Category } = require('../../database/models/index');
const {getAll, getOne, createOne, deleteOne, updateOne} = require('../../controllers/generic.controller');

// Genericas
router.get('/', getAll(Category)); // muestra todos
router.get('/:id', getOne(Category)); // muestra uno
router.post('/', /*middleware.policy,*/ createOne(Category)); // crea uno
router.delete('/:id', /*middleware.policy,*/ deleteOne(Category)); // borra uno
router.patch('/:id', /*middleware.policy,*/ updateOne(Category)); // actualiza uno

module.exports = router;
