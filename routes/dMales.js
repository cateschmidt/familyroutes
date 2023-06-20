// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dMalesController = require('../takeTheWheel/dMales');
const validation = require('../middleware/validate');


router.post('/', validation.saveDmale, dMalesController.valhalla);

router.delete('/:id', dMalesController.removeValhalla);

router.put('/:id',dMalesController.putValhalla);

module.exports = router;