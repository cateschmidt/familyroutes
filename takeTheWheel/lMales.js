// Living Males Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

// GET ALL: retrieve all living males from database
const getAll = async (req, res, next) => {
    try{
    const result = await mongodb.getDb().db('familyRoutes').collection('lMales').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  }catch(error){
    res.status(500).json({message : error})
    }
  };
// GET SINGLE: retrieve a single living male from database
const getSingle = async (req, res, next) => {
    try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('familyRoutes').collection('lMales').find({_id:userId});
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

// POST: add document to collection for a living male
const snipsAndSnails = async (req, res) => {
    try {
        const puppyDogTails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthYear: req.body.birthYear,
            birthLocation: req.body.birthLocation
        };
        const result = await mongodb.getDb().db().collection('lMales').insertOne(puppyDogTails);
        if (result.acknowleged) {
            res.status(201).json({
                message: 'Male document added to the collection',
                puppyDogTailsId: result.insertedId
            });
        } else {
            res.status(400).json('An error occurred. Male not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add male to the collection.'
        });
    }
};

//Delete
const deleteSnipsAndSnails = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const lMalesId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('familyRoutes').collection('lMales').deleteOne({
            _id: lMalesId
        }, true);
        console.log(response);
        if (response.deleteSnipsAndSnails > 0) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(response.error || 'An error occurred while deleting.')
    }
}

//PUT
const putSnipsAndSnails = async (req, res) => {
    try{
      validatelMales(req.body)
      if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a id to update.');
    }
    const lMaleId = new ObjectId(req.params.id);
    const PuppyDogTails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        birthLocation: req.body.birthLocation,
        deathYear: req.body.deathYear,
        deathLocation: req.body.deathLocation,
    };
    const response = await mongodb.getDb().db().collection('lMales').replaceOne(
        { _id: lMaleId },
        PuppyDogTails);
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
    snipsAndSnails,
    deleteSnipsAndSnails,
    getAll,
    getSingle,
    putSnipsAndSnails
}
