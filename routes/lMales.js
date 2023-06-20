// Living Females Routes

const express = require('express');
const router = express.Router();

const lMalesController = require('../takeTheWheel/lMales');
const validation = require('../middleware/validate');


router.post('/', validation.saveLmale, lMalesController.snipsAndSnails);

router.delete('/:id', lMalesController.deleteSnipsAndSnails);

router.put('/:id',lMalesController.putSnipsAndSnails);

module.exports = router;