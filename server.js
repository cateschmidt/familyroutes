const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./dbGas/connect');
const port = process.env.PORT;
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) //must be first 
    .use(cors())
    .use(bodyParser.json())
    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Requested-with, Content-Type, Accept, Z-Key'); // Allow CORS so I can test API on React
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cookieParser())
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        //commented out below line because it's preventing jest from exiting
        //console.log(`Connected to DB and listening on ${port}`);
    }
});

module.exports = app;