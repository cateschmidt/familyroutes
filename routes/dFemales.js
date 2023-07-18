// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dFemalesController = require('../takeTheWheel/dFemales');
const validation = require('../middleware/validate');

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
router.get('/',isAuthenticated, dFemalesController.getAll);
router.get('/:id',isAuthenticated, dFemalesController.getSingle);



// Post
router.post('/', isAuthenticated, validation.saveDfemale, dFemalesController.pushingUpDaisies);

//Delete
router.delete('/:id', isAuthenticated, dFemalesController.pullDaisies);

//Put


router.put('/:id', isAuthenticated, dFemalesController.puttingDaisies);

//is this extra branch working test

module.exports = router;
