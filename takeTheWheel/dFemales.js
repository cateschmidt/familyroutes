// Deceased Females Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a deseased female
const pushingUpDaisies = async (req, res) => {
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
        if (result.acknowleged) {
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const dFemaleId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('').collection('dFemales').deleteOne({
            _id: dFemaleId
        }, true);
        console.log(response);
        if (response.removingDaisies > 0) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(response.error || 'An error occurred while deleting.')
    }
};

//PUT
const puttingDaisies = async (req, res) => {
    try{
      validatedFemales(req.body)
      if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a id to update.');
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
        RIP);
  // console.log(response);
  if (response.modifiedCount > 0) 
{
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the Female ancestor.');
  }}
  catch(err){
    res.status(400).json({ message: err.message });
  }
  };  


module.exports = {
    pushingUpDaisies,
    pullDaisies, 
   puttingDaisies,
}