// Living Females Routes

const express = require('express');
const router = express.Router();

const lMalesController = require('../takeTheWheel/lMales');
const validation = require('../middleware/validate');

// Get
////////////////////
router.get('/', lMalesController.getAll);
router.get('/:id', lMalesController.getSingle);
// Post
///////////////////
router.post('/', validation.saveLmale, lMalesController.snipsAndSnails);
// Delete
//////////////////
router.delete('/:id', lMalesController.deleteSnipsAndSnails);

router.put('/:id',lMalesController.putSnipsAndSnails);

module.exports = router;