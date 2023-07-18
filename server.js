const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./dbGas/connect');
const port = process.env.PORT;
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const session = require('express-session');

app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Redirect to Github for login
app.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`,
  );
});

// callback
app.get('/callback', (req, res) => {
  const {
    code
  } = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const opts = {
    headers: {
      accept: 'application/json'
    }
  };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => {
      req.session.token = _res.data.access_token
      res.redirect('/api-docs')
    })

    .catch((err) => res.status(500).json({
      err: err.message
    }));
});

// logout
app.get('/logout', (req, res) => {
  req.session.token = null;
  res.redirect('/api-docs')

});

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
    console.log(`Connected to DB and listening on ${port}`);
  }
});

module.exports = app;