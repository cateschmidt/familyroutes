// No longer using this USER ROUTE  
// User Routes
const express = require('express');
const router = express.Router();

const usersController = require('../takeTheWheel/lMales');
const validation = require('../middleware/validate');

// Protect Routes
function isAuthenticated(req, res, next) {
    try {
      if (req.session.token) {
        next();
      } else {
        throw new Error("Please login");
      }
    } catch (error) {
      res.status(400).json({message: "Please login"});
    }
  }


// Get
////////////////////
router.get('/', isAuthenticated, usersController.getAll);
router.get('/:id', isAuthenticated, usersController.getSingle);



//Delete User
router.delete('/:id', isAuthenticated, usersController.removeUser);

module.exports = router;

