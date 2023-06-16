// Deceased Females Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a deseased female
const pushingUpDaisies = async (req, res) => {
    try {
        const dearlyBeloved = {

        };
        const result = await db.collection('dFemales').insertOne(dearlyBeloved);
        if (result.acknowleged) {
            res.status(201).json({
                message: 'Female ancestor added to the collection',
                dearlyBelovedId: result.insertedId
            });
        } else {
            res.status(400).jason('An error occurred. Ancestor not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add female ancestor to the collection.'
        });
    }
};





module.exports = {
    pushingUpDaisies
};