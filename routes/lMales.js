// Living Males Routes

const express = require('express');
const router = express.Router();

const lMalesController = require('../takeTheWheel/lMales');



router.post('/', lMalesController.snipsAndSnails);




module.exports = router;