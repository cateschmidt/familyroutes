// Living Females Routes

const express = require('express');
const router = express.Router();

const lFemalesController = require('../takeTheWheel/lFemales');
const validation = require('../middleware/validate');

// Get
////////////////////
router.get('/', lFemalesController.getAll);
router.get('/:id', lFemalesController.getSingle);
// Post
///////////////////
router.post('/', validation.saveLfemale, lFemalesController.fataleAttraction);
// Delete
//////////////////
router.delete('/:id', lFemalesController.deleteFA);


module.exports = router;