// Deceased Females jest unit tests
// Used Brother Birch's Jest unit tests as a template: https://github.com/byui-cse/cse341-code-student/blob/L12-class-complete/__tests__/mongo.spec.js

const request = require('supertest');
const app = require('../server');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const { setupDatabase, teardownDatabase, getDb } = require('./test-setup');

describe('lMales API', () => {
  let db;

  beforeAll(async () => {
    await setupDatabase();
    db = getDb();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  // Test the POST route for dMales
  it('should post a new deceased male into the dMales collection', async () => {
    const dMalesCollection = db.collection('dMales');

    const mockDmale = {
      id: "003",
      firstName: "Yondu",
      lastName: "Udonta",
      birthYear: "2990",
      birthLocation: "Centauri IV, Earth-691",
      deathYear: "3177",
      deathLocation: "Centauri IV, Earth-691",
    };

    await dMalesCollection.insertOne(mockDmale);

    const postedDmale = await dMalesCollection.findOne({
      id: '003',
    });

    expect(postedDmale).toEqual(mockDmale);
  });

  // Test the GET route for dMales
  it('should retrieve the deceased male from the dMales collection', async () => {
    const dMalesCollection = db.collection('dMales');

    const retrievedDmale = await dMalesCollection.findOne({
      id: '003',
    });

    expect(retrievedDmale).toBeDefined();
  });

  // Test the PUT route for dMales
//   it('should update the deceased male in the dMales collection', async () => {
//     const dMalesCollection = db.collection('dMales');

//     const updatedDmale = {
//       firstName: "Yondu",
//       lastName: "Udonta",
//       birthYear: "2991",
//       birthLocation: "Centauri IV, Earth-691",
//       deathYear: "3177",
//       deathLocation: "Centauri IV, Earth-691",
//     };

//     await dMalesCollection.updateOne({ id: '003' }, { $set: updatedDmale });

//     const retrievedDmale = await dMalesCollection.findOne({ id: '003' });

//     expect(retrievedDmale).toEqual(updatedDmale);
//   });

  // Test the DELETE route for dMales (delete the mock data)
  it('should delete the deceased male from the dMales collection', async () => {
    const dMalesCollection = db.collection('dMales');

    await dMalesCollection.deleteOne({
      id: '003',
    });

    const deletedDMale = await dMalesCollection.findOne({
      id: '003',
    });

    expect(deletedDMale).toBeNull();
  });
});
