// Deceased Females Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

 
// GET ALL: retrieve all deceased females from database
const getAll = async (req, res, next) => {
    try{
    const result = await mongodb.getDb().db('familyRoutes').collection('dFemales').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  }catch(error){
    res.status(500).json({message : error})
    }
  };
// GET SINGLE: retrieve a single deceased female from database
const getSingle = async (req, res, next) => {
    try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('familyRoutes').collection('dFemales').find({_id:userId});
    if (!result){
      res.status(404).json({message : "unable to find ID"})
    }
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]); // we just need the first one (the only one)
    });
  }catch(error){
    res.status(500).json({message : "unable to get ID, make sure you have entered a valid ID"})
    }
  };


// POST: add document to collection for a deceased female
const pushingUpDaisies = async (req, res) => {
  //console.log('pushingUpDaisies', req.body);
    try {
        const dearlyBeloved = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthYear: req.body.birthYear,
            birthLocation: req.body.birthLocation,
            deathYear: req.body.deathYear,
            deathLocation: req.body.deathLocation,
            children: req.body.children
        };
        const result = await mongodb.getDb().db().collection('dFemales').insertOne(dearlyBeloved);
        if (result.acknowledged) {
            res.status(201).json({
                message: 'Female ancestor added to the collection',
                dearlyBelovedId: result.insertedId
            });
        } else {
            res.status(400).json('An error occurred. Female ancestor not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add female ancestor to the collection.'
        });
    }
};

//DELETE: delete from collection using ID
const pullDaisies = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }
    const dFemalesId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db('familyRoutes').collection('dFemales').deleteOne({
            _id: dFemalesId
        }, true);
       
        if (response.deletedCount > 0) {
            res.status(200).json({
              message: 'dFemale deleted successfully'
            });
        } else {
          res.status(400).json('dfemale not found')
        }
    } catch (err) {
        res.status(500).json('Unable to perform delete.');
    }
};

//code for Pull validation 
const validatedFemales = (data) => {
  const {firstName,  lastName, birthYear, birthLocation, deathLocation, children } = data;
  if (!firstName || !lastName || !birthYear || !birthLocation || !deathYear || !deathLocation || !children ){ 
    throw new Error('all feilds must be filled, firstName,  lastName, birthYear, birthLocation, deathLocation, children ')
  }
};

//PUT
// const puttingDaisies = async (req, res) => {
//     try{
//       validatedFemales(req.body)
//       if (!ObjectId.isValid(req.params.id)) {
//       res.status(400).json('Must use a id to update.');
//     }
//     const dFemaleId = new ObjectId(req.params.id);
//     const RIP = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         birthYear: req.body.birthYear,
//         birthLocation: req.body.birthLocation,
//         deathYear: req.body.deathYear,
//         deathLocation: req.body.deathLocation,
//         children: req.body.children
//     };
//     const response = await mongodb.getDb().db().collection('dFemales').replaceOne(
//         { _id: dFemaleId },
//         RIP);
//   // console.log(response);
//   if (response.modifiedCount > 0) 
// {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while updating the Female ancestor.');
//   }}
//   catch(err){
//     res.status(400).json({ message: err.message });
//   }
//   };  

///this is the updated code with 'data' 
///this is the new code

const puttingDaisies = async (req, res) => {
  try {
    // Define your validation function to check the req.body properties
    const validateInput = (data) => {
      // Perform your validation checks here
      if (!data.firstName || !data.lastName || !data.birthYear || !data.deathYear) {
        throw new Error('Missing required fields');
      }
    };

    // Invoke the validation function passing in the req.body object
    validateInput(req.body);

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use an ID to update.');
    }

    const dFemaleId = new ObjectId(req.params.id);

    const RIP = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      birthLocation: req.body.birthLocation,
      deathYear: req.body.deathYear,
      deathLocation: req.body.deathLocation,
      children: req.body.children
    };

    const response = await mongodb.getDb().db().collection('dFemales').replaceOne(
      { _id: dFemaleId },
      RIP
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Female ancestor.');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    pushingUpDaisies,
    pullDaisies,
    getAll,
    getSingle,
    puttingDaisies
}
