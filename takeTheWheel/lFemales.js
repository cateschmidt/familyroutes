// Living Females Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


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
        if (result.acknowleged) {
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const lFemaleId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('').collection('lFemales').deleteOne({
            _id: lFemaleId
        }, true);
        console.log(response);
        if (response.removeValhalla > 0) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(response.error || 'An error occurred while deleting.')
    }
};





module.exports = {
    fataleAttraction,
    deleteFA
}