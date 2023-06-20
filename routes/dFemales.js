// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dFemalesController = require('../takeTheWheel/dFemales');
const validation = require('../middleware/validate');


router.post('/', validation.saveDfemale, dFemalesController.pushingUpDaisies);

router.delete('/:id', dFemalesController.pullDaisies);



module.exports = router;