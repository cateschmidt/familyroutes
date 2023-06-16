// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dMalesController = require('../takeTheWheel/dMales');



router.post('/', dMalesController.valhalla);




module.exports = router;