// Living Females Routes

const express = require('express');
const router = express.Router();

const lFemalesController = require('../takeTheWheel/lFemales');



router.post('/', lFemalesController.fataleAttraction);

router.delete('/:id', lFemalesController.deleteFA);


module.exports = router;