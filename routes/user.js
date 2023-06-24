// No longer using this USER ROUTE  
// User Routes
const express = require('express');
const router = express.Router();

const usersController = require('../takeTheWheel/lMales');
const validation = require('../middleware/validate');


// Get
////////////////////
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);



//Delete User
router.delete('/:id', usersController.removeUser);

module.exports = router;

