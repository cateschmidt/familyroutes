// Living Females Routes

const express = require('express');
const router = express.Router();

const lFemalesController = require('../takeTheWheel/lFemales');



router.post('/', lFemalesController.fataleAttraction);




module.exports = router;