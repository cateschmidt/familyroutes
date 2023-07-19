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
        if (result.acknowledged) {
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
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const lMalesId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('familyRoutes').collection('lMales').deleteOne({
            _id: lMalesId
        }, true);
        
        if (response.deleteCount > 0) {
            res.status(200).json({
              message: 'lMale deleted successfully'
            });
        } else {
          res.status(400).json('lMale not found')
        }
    } catch (err) {
        res.status(500).json('Unable to perform delete.')
    }
};

//code for Pull validation 
const validatelMales = (data) => {
  const {firstName,  lastName, birthYear, birthLocation, deathLocation, children } = data;
  if (!firstName || !lastName || !birthYear || !birthLocation){ 
    throw new Error('all fields must be completed, firstName, lastName, birthYear, birthLocation')
  }
};
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
        birthLocation: req.body.birthLocation
    };
    const response = await mongodb.getDb().db().collection('lMales').replaceOne(
        { _id: lMaleId },
        PuppyDogTails);
  // console.log(response);
  if (response.modifiedCount > 0) 
{
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the living male.');
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
