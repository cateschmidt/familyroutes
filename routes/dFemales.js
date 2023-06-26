// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dFemalesController = require('../takeTheWheel/dFemales');
const validation = require('../middleware/validate');

// Get
////////////////////
router.get('/', dFemalesController.getAll);
router.get('/:id', dFemalesController.getSingle);

// Get
////////////////////
router.get('/', dFemalesController.getAll);
router.get('/:id', dFemalesController.getSingle);

// Post
router.post('/', validation.saveDfemale, dFemalesController.pushingUpDaisies);

//Delete
router.delete('/:id', dFemalesController.pullDaisies);

//Put
router.put('/:id',dFemalesController.puttingDaisies);
//is this extra branch working test

module.exports = router;
