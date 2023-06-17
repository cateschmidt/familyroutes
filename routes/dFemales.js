// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dFemalesController = require('../takeTheWheel/dFemales');



router.post('/', dFemalesController.pushingUpDaisies);

router.delete('/:id', dFemalesController.pullDaisies);




module.exports = router;