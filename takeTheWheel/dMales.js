// Deceased Males Controller

const mongodb = require('../dbGas/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


// POST: add document to collection for a deseased male
const valhalla = async (req, res) => {
    try {
        const dearlyDeparted = {

        };
        const result = await db.collection('dMales').insertOne(dearlyDeparted);
        if (result.acknowleged) {
            res.status(201).json({
                message: 'Male ancestor added to the collection',
                dearlyDepartedId: result.insertedId
            });
        } else {
            res.status(400).jason('An error occurred. Ancestor not added to the collection.');
        }
    } catch (error) {
        console.error('Warning. Unable to access database.:', error);
        res.status(500).json({
            message: 'Unable to add male ancestor to the collection.'
        });
    }
};





module.exports = {
    valhalla
};