// Living Females Routes

const express = require('express');
const router = express.Router();

const lMalesController = require('../takeTheWheel/lMales');
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
router.get('/', isAuthenticated, lMalesController.getAll);
router.get('/:id', isAuthenticated, lMalesController.getSingle);

//Put
router.post('/', isAuthenticated, validation.saveLmale, lMalesController.snipsAndSnails);

//Delete
router.delete('/:id', isAuthenticated, lMalesController.deleteSnipsAndSnails);

//Put
router.put('/:id', isAuthenticated, lMalesController.putSnipsAndSnails);


module.exports = router;
