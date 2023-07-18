// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dFemalesController = require('../takeTheWheel/dFemales');
const validation = require('../middleware/validate');


// Get
////////////////////
router.get('/',isAuthenticated, dFemalesController.getAll);
router.get('/:id',isAuthenticated, dFemalesController.getSingle);



// Post
router.post('/', isAuthenticated, validation.saveDfemale, dFemalesController.pushingUpDaisies);

//Delete
router.delete('/:id', isAuthenticated, dFemalesController.pullDaisies);

//Put


router.put('/:id', isAuthenticated, dFemalesController.puttingDaisies);

//is this extra branch working test

module.exports = router;
