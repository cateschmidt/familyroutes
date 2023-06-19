const validator = require('../helpValidate/validate');

const saveDfemale = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthYear: 'required|string',
        birthLocation: 'required|string',
        deathYear: 'required|string',
        deathLocation: 'required|string',
        children: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Deceased female validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveDmale = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthYear: 'required|string',
        birthLocation: 'required|string',
        deathYear: 'required|string',
        deathLocation: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Deceased male validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveLfemale = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthYear: 'required|string',
        birthLocation: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Living female validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveLmale = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthYear: 'required|string',
        birthLocation: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Living male validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


const saveUser = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'User validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveDfemale,
    saveDmale,
    saveLfemale,
    saveLmale,
    saveUser
};