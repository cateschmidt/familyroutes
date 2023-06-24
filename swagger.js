const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Family Routes',
        description: 'CSE341 Final Project by Cherelle Payne, Diane Arndt, Beth Yanez, and Cate Schmidt',
    },
   
    host: 'familyroutes-abts.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
