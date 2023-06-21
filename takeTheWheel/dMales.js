// Deceased Males Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a deseased male
const valhalla = async (req, res) => {
    try {
        const dearlyDeparted = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthYear: req.body.birthYear,
            birthLocation: req.body.birthLocation,
            deathYear: req.body.deathYear,
            deathLocation: req.body.deathLocation,
        };
        const result = await mongodb.getDb().db().collection('dMales').insertOne(dearlyDeparted);
        if (result.acknowleged) {
            res.status(201).json({
                message: 'Male ancestor added to the collection',
                dearlyDepartedId: result.insertedId
            });
        } else {
            res.status(400).json('An error occurred. Male ancestor not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add male ancestor to the collection.'
        });
    }
};

//DELETE: delete from collection using ID
const removeValhalla = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const dMalesId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('familyRoutes').collection('dMales').deleteOne({
            _id: dMalesId
        }, true);
        console.log(response);
        if (response.removeValhalla > 0) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(response.error || 'An error occurred while deleting.')
    }
};

//PUT
const putValhalla = async (req, res) => {
    try{
      validatedMales(req.body)
      if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a id to update.');
    }
    const dMaleId = new ObjectId(req.params.id);
    const deadFread = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        birthLocation: req.body.birthLocation,
        deathYear: req.body.deathYear,
        deathLocation: req.body.deathLocation,
    };
    const response = await mongodb.getDb().db().collection('dMales').replaceOne(
        { _id: dMaleId },
        deadFread);
  // console.log(response);
  if (response.modifiedCount > 0) 
{
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the male ancestor.');
  }}
  catch(err){
    res.status(400).json({ message: err.message });
  }
  };  

// GET ALL: retrieve all deceased males from database
const getAll = async (req, res, next) => {
    try{
    const result = await mongodb.getDb().db('familyRoutes').collection('dMales').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  }catch(error){
    res.status(500).json({message : error})
    }
  };
// GET SINGLE: retrieve a single deceased male from database
const getSingle = async (req, res, next) => {
    try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('familyRoutes').collection('dMales').find({_id:userId});
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


module.exports = {
    valhalla,
    removeValhalla,
    putValhalla,
    getAll,
    getSingle
}