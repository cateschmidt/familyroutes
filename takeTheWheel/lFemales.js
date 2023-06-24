// Living Females Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

// GET ALL: retrieve all living females from database
const getAll = async (req, res, next) => {
    try{
    const result = await mongodb.getDb().db('familyRoutes').collection('lFemales').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  }catch(error){
    res.status(500).json({message : error})
    }
  };
// GET SINGLE: retrieve a single living female from database
const getSingle = async (req, res, next) => {
    try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('familyRoutes').collection('lFemales').find({_id:userId});
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

// POST: add document to collection for a living female
const fataleAttraction = async (req, res) => {
    try {
        const girlPower = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthYear: req.body.birthYear,
            birthLocation: req.body.birthLocation
        };
        const result = await mongodb.getDb().db().collection('lFemales').insertOne(girlPower);
        if (result.acknowledged) {
            res.status(201).json({
                message: 'Female document added to the collection',
                girlPowerId: result.insertedId
            });
        } else {
            res.status(400).json('An error occurred. Female not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add female to the collection.'
        });
    }
};

const deleteFA = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const lFemalesId = new ObjectId(req.params.id);
     const response = await mongodb.getDb().db('familyRoutes').collection('lFemales').deleteOne({
            _id: lFemalesId
        }, true);
        // console.log(response);
        if (response.deletedCount> 0) {
            res.status(200).json({
              message: 'lFemale deleted successfully'
            });
        } else {
          res.status(400).json('dfemale not found')
        }
    } catch (err) {
        res.status(500).json('Unable to perform delete.')
    }
};

//put
const putFemmeFatale = async (req, res) => {
    try{
      validatelFemales(req.body)
      if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a id to update.');
    }
    const lFemaleId = new ObjectId(req.params.id);
    const Femme = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        birthLocation: req.body.birthLocation,
        deathYear: req.body.deathYear,
        deathLocation: req.body.deathLocation,
    };
    const response = await mongodb.getDb().db().collection('lFemales').replaceOne(
        { _id: lFemaleId },
        Femme);
  // console.log(response);
  if (response.modifiedCount > 0) 
{
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the living female.');
  }}
  catch(err){
    res.status(400).json({ message: err.message });
  }
  };  


module.exports = {
    fataleAttraction,
    deleteFA,
    putFemmeFatale,
    getAll,
    getSingle
}
