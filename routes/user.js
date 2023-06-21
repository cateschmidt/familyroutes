// User Routes
const express = require('express');
const router = express.Router();

const lMalesController = require('../takeTheWheel/lMales');
const validation = require('../middleware/validate');


// Get
////////////////////
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Ooops, I have no idea how to add a user. I need to research this (Beth)

//Delete User
router.delete('/:id', usersController.removeUser);

module.exports = router;

