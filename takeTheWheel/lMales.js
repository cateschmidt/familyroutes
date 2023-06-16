// Living Males Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a living male
const snipsAndSnails = async (req, res) => {
    try {
        const puppyDogTails = {

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





module.exports = {
    snipsAndSnails
};