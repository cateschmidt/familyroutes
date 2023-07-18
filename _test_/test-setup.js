const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

let mongoServer;

async function setup() {
  // mongoServer = new MongoMemoryServer();
  // const mongoUri = await mongoServer.getUri();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  // Set up a connection to the mock MongoDB server
  await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function teardown() {
  // Cleanup and stop the mock MongoDB server
  await mongoServer.stop();
}

module.exports = { setup, teardown };


