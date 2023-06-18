// Living Males Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a living male
const snipsAndSnails = async (req, res) => {
    try {
        const puppyDogTails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthYear: req.body.birthYear,
            birthLocation: req.body.birthLocation
        };
        const result = await db.collection('lMales').insertOne(puppyDogTails);
        if (result.acknowleged) {
            res.status(201).json({
                message: 'Male document added to the collection',
                puppyDogTailsId: result.insertedId
            });
        } else {
            res.status(400).jason('An error occurred. Male not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add male to the collection.'
        });
    }
};

const deleteSnipsAndSnails = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must have a valid ID to perform a delete.');
        return;
    }

    const lMaleId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('').collection('lMale').deleteOne({
            _id: lMaleId
        }, true);
        console.log(response);
        if (response.removeValhalla > 0) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(response.error || 'An error occurred while deleting.')
    }
}




module.exports = {
    snipsAndSnails,
    deleteSnipsAndSnails
};