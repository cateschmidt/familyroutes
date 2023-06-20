// Living Females Routes

const express = require('express');
const router = express.Router();

const lFemalesController = require('../takeTheWheel/lFemales');
const validation = require('../middleware/validate');


router.post('/', validation.saveLfemale, lFemalesController.fataleAttraction);

router.delete('/:id', lFemalesController.deleteFA);

router.put('/:id',lFemalesController.putFemmeFatale);

module.exports = router;