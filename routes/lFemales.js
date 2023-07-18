// Living Females Routes

const express = require('express');
const router = express.Router();

const lFemalesController = require('../takeTheWheel/lFemales');
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
router.get('/', isAuthenticated, lFemalesController.getAll);
router.get('/:id', isAuthenticated, lFemalesController.getSingle);


//Put
router.post('/', isAuthenticated, validation.saveLfemale, lFemalesController.fataleAttraction);


//Delete
router.delete('/:id', isAuthenticated, lFemalesController.deleteFA);

//Put
router.put('/:id', isAuthenticated, lFemalesController.putFemmeFatale);


module.exports = router;
