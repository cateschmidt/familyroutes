// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dMalesController = require('../takeTheWheel/dMales');
const validation = require('../middleware/validate');


// Get
////////////////////
router.get('/', dMalesController.getAll);
router.get('/:id', dMalesController.getSingle);

// Get
////////////////////
router.get('/', dMalesController.getAll);
router.get('/:id', dMalesController.getSingle);

// Post
router.post('/', validation.saveDmale, dMalesController.valhalla);

//Delete
router.delete('/:id', dMalesController.removeValhalla);

//Put
router.put('/:id', dMalesController.putValhalla);



module.exports = router;
