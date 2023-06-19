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
            res.status(400).json('An error occurred. Ancestor not added to the collection.');
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

    const dMaleId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db('').collection('dMales').deleteOne({
            _id: dMaleId
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
    valhalla,
    removeValhalla
}