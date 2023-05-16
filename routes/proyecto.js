const { Router } = require('express');
const { createProyecto, getProyectos, getProyecto, updateProyecto } = require('../controllers/proyecto');

const router = Router()

router.post('/', createProyecto);

router.get('/', getProyectos);

router.get('/:id', getProyecto);

router.put('/:id', updateProyecto);

module.exports = router;