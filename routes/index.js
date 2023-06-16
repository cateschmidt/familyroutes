const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));




router.use('/dFemales', require('./dFemales'));
router.use('/dMales', require('./dMales'));
router.use('/lFemales', require('./lFemales'));
router.use('/lMales', require('./lMales'));

module.exports = router;