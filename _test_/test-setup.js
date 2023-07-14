const MongoClient = require('mongodb').MongoClient;

let connection;
let db;

async function setupDatabase() {
  connection = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db('familyRoutes');
}

async function teardownDatabase() {
  await connection.close();
}

module.exports = {
  setupDatabase,
  teardownDatabase,
  getDb: () => db,
};

