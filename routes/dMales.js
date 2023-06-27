// Deceased Males Routes

const express = require('express');
const router = express.Router();

const dMalesController = require('../takeTheWheel/dMales');
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
router.get('/', isAuthenticated, dMalesController.getAll);
router.get('/:id', isAuthenticated, dMalesController.getSingle);


// Post
router.post('/', isAuthenticated, validation.saveDmale, dMalesController.valhalla);

//Delete
router.delete('/:id', isAuthenticated, dMalesController.removeValhalla);

//Put
router.put('/:id', isAuthenticated, dMalesController.putValhalla);



module.exports = router;
