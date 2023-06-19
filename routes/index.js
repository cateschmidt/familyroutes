const {
    auth
} = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const express = require('express');
const router = express.Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/checkLoginStatus', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


function isAuthenticated(req, res, next) {
    try {
        if (req.session.token) {
            next();
        } else {
            throw new Error("You must be logged in to view Family Routes.");
        }
    } catch (error) {
        res.status(400).json({
            message: "Please login"
        });
    }
}


router.use('/', require('./swagger'));

router.use('/dFemales', require('./dFemales'));
router.use('/dMales', require('./dMales'));
router.use('/lFemales', require('./lFemales'));
router.use('/lMales', require('./lMales'));


module.exports = {
    router,
    isAuthenticated
};