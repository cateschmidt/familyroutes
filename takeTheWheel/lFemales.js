// Living Females Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a living female
const fataleAttraction = async (req, res) => {
    try {
        const girlPower = {

        };
        const result = await db.collection('lFemales').insertOne(girlPower);
        if (result.acknowleged) {
            res.status(201).json({
                message: 'Female document added to the collection',
                girlPowerId: result.insertedId
            });
        } else {
            res.status(400).jason('An error occurred. Female not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add female to the collection.'
        });
    }
};





module.exports = {
    fataleAttraction
};