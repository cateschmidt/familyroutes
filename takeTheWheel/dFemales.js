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
            res.status(400).json('An error occurred. Ancestor not added to the collection.');
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

    const dFemalesId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('').collection('dFemales').deleteOne({
            _id: dFemalesId
        }, true);
        console.log(response);
        if (response.removingDaisies > 0) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(response.error || 'An error occurred while deleting.')
    }
};



module.exports = {
    pushingUpDaisies,
    pullDaisies
}