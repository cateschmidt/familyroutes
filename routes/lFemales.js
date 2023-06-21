// Living Females Routes

const express = require('express');
const router = express.Router();

const lFemalesController = require('../takeTheWheel/lFemales');
const validation = require('../middleware/validate');

// Get
////////////////////
router.get('/', lFemalesController.getAll);
router.get('/:id', lFemalesController.getSingle);

// Get
////////////////////
router.get('/', lFemalesController.getAll);
router.get('/:id', lFemalesController.getSingle);

//Put
router.post('/', validation.saveLfemale, lFemalesController.fataleAttraction);

//Delete
router.delete('/:id', lFemalesController.deleteFA);

//Put
router.put('/:id',lFemalesController.putFemmeFatale);


module.exports = router;
